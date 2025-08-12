# GoMDB.com

¡Bienvenido al sitio oficial de GoMDB!  
Este proyecto fue desarrollado como una plataforma demostrativa para compartir recursos, historias de clientes, demos y contenido técnico alrededor del ecosistema MongoDB.

---

## 🚀 ¿Qué es GoMDB?

GoMDB es una experiencia web creada con React y desplegada en Vercel.  
Incluye páginas estáticas y dinámicas, recursos organizados por cliente, y contenido embebido como MongoDB Charts, videos y documentos interactivos.

---

## 🛠 Stack Tecnológico

- **React** (JSX) con rutas personalizadas (`src/pages`)
- **Vercel** para despliegue continuo (CI/CD)
- **MongoDB Charts** embebido
- **Archivos estáticos** en la carpeta `public/` por cliente
- **React Router DOM** para navegación

---

## 📁 Estructura del proyecto

```bash
gomdb-site/
├── public/
│   └── clientes/
│       ├── bancolombia/
│       ├── segurosbolivar/
│       └── cencosud/
│           └── documento-inicial.html
├── src/
│   └── pages/
│       └── Clientes/
│           └── cencosud/
│               └── document-mongo.jsx
├── package.json
├── vercel.json
└── README.md

📌 Nota importante sobre public/clientes/

La mayor parte del contenido visual por cliente (HTML, logos, imágenes, PDFs, etc.) vive dentro de la carpeta:
public/clientes/<nombre-del-cliente>/

Esta carpeta permite servir contenido estático directamente desde la web, por ejemplo:
https://gomdb.com/clientes/cencosud/documento-inicial.html