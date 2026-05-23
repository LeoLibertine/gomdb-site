/**
 * Vite plugin: serves Vercel-style serverless functions from /api during local dev.
 *
 * Maps:
 *   GET /api/cosmica/clientes            -> api/cosmica/clientes/index.js
 *   PUT /api/cosmica/clientes/abc123     -> api/cosmica/clientes/[id].js (req.query.id = "abc123")
 *   GET /api/cosmica/clientes/buscar     -> api/cosmica/clientes/buscar.js (exact match takes precedence)
 *   GET /api/cosmica/vendedores          -> api/cosmica/vendedores.js
 *
 * Only used in development. Production routing is handled by Vercel via vercel.json.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import dotenv from 'dotenv'

const ROOT = path.dirname(url.fileURLToPath(import.meta.url))
const API_DIR = path.join(ROOT, 'api')

dotenv.config({ path: path.join(ROOT, '.env.local') })

function collectRoutes(dir, basePrefix = '') {
  const routes = []
  if (!fs.existsSync(dir)) return routes

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_')) continue
    const full = path.join(dir, entry.name)
    const urlPart = entry.name.replace(/\.js$/, '')
    if (entry.isDirectory()) {
      routes.push(...collectRoutes(full, `${basePrefix}/${urlPart}`))
    } else if (entry.name.endsWith('.js')) {
      const dynamic = urlPart.startsWith('[') && urlPart.endsWith(']')
      const paramName = dynamic ? urlPart.slice(1, -1) : null
      const isIndex = urlPart === 'index'
      const routePath = isIndex
        ? basePrefix
        : `${basePrefix}/${dynamic ? `:${paramName}` : urlPart}`
      routes.push({ filePath: full, routePath, paramName })
    }
  }
  return routes
}

function matchRoute(urlPath, routes) {
  // exact matches (no params) first
  const sorted = [...routes].sort((a, b) => (a.paramName ? 1 : 0) - (b.paramName ? 1 : 0))
  for (const route of sorted) {
    if (!route.paramName) {
      if (route.routePath === urlPath) return { route, params: {} }
    } else {
      const pattern = '^' + route.routePath.replace(`:${route.paramName}`, '([^/]+)') + '$'
      const m = urlPath.match(new RegExp(pattern))
      if (m) return { route, params: { [route.paramName]: decodeURIComponent(m[1]) } }
    }
  }
  return null
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      if (!raw) return resolve(undefined)
      const type = req.headers['content-type'] || ''
      if (type.includes('application/json')) {
        try { resolve(JSON.parse(raw)) } catch (err) { reject(err) }
      } else {
        resolve(raw)
      }
    })
    req.on('error', reject)
  })
}

function wrapRes(res) {
  let statusCode = 200
  const wrapped = {
    setHeader: (k, v) => res.setHeader(k, v),
    getHeader: (k) => res.getHeader(k),
    status: (code) => {
      statusCode = code
      res.statusCode = code
      return wrapped
    },
    json: (obj) => {
      res.statusCode = statusCode
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(obj))
    },
    send: (data) => {
      res.statusCode = statusCode
      if (Buffer.isBuffer(data) || typeof data === 'string') return res.end(data)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(data))
    },
    end: (data) => {
      res.statusCode = statusCode
      res.end(data)
    }
  }
  return wrapped
}

export function vercelApiDevPlugin() {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      const routes = collectRoutes(API_DIR, '/api')
      // eslint-disable-next-line no-console
      console.log(`[api-dev] loaded ${routes.length} route(s) from /api`)
      routes.forEach((r) => console.log(`  ${r.routePath} -> ${path.relative(ROOT, r.filePath)}`))

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next()

        const parsed = new URL(req.url, 'http://localhost')
        const match = matchRoute(parsed.pathname, routes)
        if (!match) return next()

        try {
          const mod = await server.ssrLoadModule(match.route.filePath)
          const handler = mod.default
          if (typeof handler !== 'function') {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Handler does not export a default function' }))
            return
          }

          const query = Object.fromEntries(parsed.searchParams.entries())
          Object.assign(query, match.params)

          let body
          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
            body = await parseBody(req)
          }

          const fakeReq = {
            method: req.method,
            query,
            body,
            headers: req.headers,
            url: req.url
          }

          await handler(fakeReq, wrapRes(res))
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[api-dev] handler error', err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal error', detail: String(err.message || err) }))
          }
        }
      })
    }
  }
}
