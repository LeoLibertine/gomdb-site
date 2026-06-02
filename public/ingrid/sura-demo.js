/* SURA × MongoDB Atlas demo dashboard
 * - Vista 360 (panel izq)
 * - Hybrid Search + Fraud Detection (panel der)
 * - Live FNOL (footer)
 */

const API = 'https://quarterly-excuse-novels-justify.trycloudflare.com/api/sura-demo';

// ── State ─────────────────────────────────────────────────────────────────────
const state = {
  policies: [],
  currentPolicy: null,
  fraudFile: null,
  fraudFileB64: null,
};

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) e.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    e.append(c.nodeType ? c : document.createTextNode(c));
  }
  return e;
};

const fmtCOP = n => n ? `$${Math.round(n).toLocaleString('es-CO')}` : '—';
const fmtCOPMillions = n => {
  if (!n) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
};
const fmtDate = iso => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
};
const scoreClass = s => s >= 0.85 ? 'high' : s >= 0.55 ? 'med' : 'low';
const scorePct = s => `${(s * 100).toFixed(1)}%`;

const _INCIDENT_LABELS = {
  rear_end_collision: 'Alcance trasero',
  side_collision: 'Colisión lateral',
  front_collision: 'Choque frontal',
  fixed_object_collision: 'Objeto fijo',
  collision: 'Colisión',
  other: 'Otro',
};
const incidentLabel = t => _INCIDENT_LABELS[t] || t || '—';

// ── Boot ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', async () => {
  setupTabs();
  setupSearch();
  setupFraud();
  setupModal();
  setupMongoViewer();
  await Promise.all([
    loadStats(),
    loadPolicies(),
  ]);
  loadLiveClaim();
  setInterval(loadLiveClaim, 6000);
});

// ── Hero stats ────────────────────────────────────────────────────────────────
async function loadStats() {
  try {
    const [claimsR, policiesR] = await Promise.all([
      fetch(`${API}/claims?limit=100&include_synthetic=true`).then(r => r.json()),
      // policyholders no tienen endpoint propio — derivamos del listado de claims
      fetch(`${API}/claims?limit=100&include_synthetic=true`).then(r => r.json()),
    ]);
    const claims = claimsR.claims || [];
    const policySet = new Set(claims.map(c => c.policy_number).filter(Boolean));
    $('stat-claims').textContent = claims.length;
    $('stat-policies').textContent = policySet.size;
    // photos: hardcoded 75 (seed inicial) — actualizable después con un endpoint stats real
    $('stat-photos').textContent = '75+';
  } catch (e) {
    console.error('loadStats', e);
  }
}

// ── Policies picker + Vista 360 ──────────────────────────────────────────────
async function loadPolicies() {
  // Las pólizas las inferimos del listado de claims (todos los sintéticos + voz)
  const r = await fetch(`${API}/claims?limit=200&include_synthetic=true`).then(r => r.json());
  const seen = new Set();
  const policies = [];
  for (const c of (r.claims || [])) {
    if (!c.policy_number || seen.has(c.policy_number)) continue;
    seen.add(c.policy_number);
    policies.push({ policy_number: c.policy_number, customer_name: c.customer_name });
  }
  policies.sort((a, b) => a.policy_number.localeCompare(b.policy_number));
  state.policies = policies;

  // Populate dropdowns
  const sel = $('policy-picker');
  const fraudSel = $('fraud-policy');
  for (const p of policies) {
    const opt1 = el('option', { value: p.policy_number }, `${p.policy_number} — ${p.customer_name}`);
    const opt2 = el('option', { value: p.policy_number }, `${p.policy_number} — ${p.customer_name}`);
    sel.appendChild(opt1);
    fraudSel.appendChild(opt2);
  }

  sel.addEventListener('change', () => showCustomer360(sel.value));

  // Default: Leonel (SR-CL-100001) — demo principal
  const defaultPolicy = policies.find(p => p.policy_number === 'SR-CL-100001') || policies[0];
  if (defaultPolicy) {
    sel.value = defaultPolicy.policy_number;
    fraudSel.value = defaultPolicy.policy_number;
    await showCustomer360(defaultPolicy.policy_number);
  }
}

async function showCustomer360(policyNumber) {
  state.currentPolicy = policyNumber;
  const panel = $('customer-panel');
  const timeline = $('claims-timeline');
  panel.classList.add('skeleton');
  panel.innerHTML = '';
  timeline.innerHTML = '';

  try {
    const r = await fetch(`${API}/customer-360/${encodeURIComponent(policyNumber)}`).then(r => r.json());
    const d = r.data;
    panel.classList.remove('skeleton');
    panel.innerHTML = '';

    const ins = d.insured || {};
    const v = d.vehicle || {};
    const s = d.stats || {};

    const head = el('div', { class: 'customer-head' },
      el('div', {},
        el('div', { class: 'customer-name' }, ins.full_name || '—'),
        el('div', { class: 'customer-meta' },
          `Cédula ${ins.cedula || '—'} · ${ins.phone || '—'}`),
        el('div', { class: 'customer-meta' },
          `${v.year || ''} ${v.make || ''} ${v.model || ''} ${v.color || ''} · Placa ${v.plate || '—'}`),
      ),
      el('span', { class: 'policy-badge' }, policyNumber),
    );
    panel.appendChild(head);

    const kpis = el('div', { class: 'kpis' },
      kpi(s.total_claims ?? 0, 'Reportes totales'),
      kpi(s.settled_claims ?? 0, 'Cerrados'),
      kpi(fmtCOPMillions(s.total_paid_cop), 'Pagado COP'),
      kpi(s.avg_days_to_close ? `${s.avg_days_to_close.toFixed(1)}d` : '—', 'Avg cierre'),
    );
    panel.appendChild(kpis);

    // Timeline de claims
    const claims = (d.claims || []).slice().sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    if (claims.length === 0) {
      timeline.appendChild(el('p', { class: 'muted' }, 'Sin reportes históricos.'));
    } else {
      // Group photos by claim_number for thumbnails
      const photosByClaim = {};
      for (const p of (d.photos || [])) {
        if (!photosByClaim[p.claim_number]) photosByClaim[p.claim_number] = [];
        photosByClaim[p.claim_number].push(p);
      }
      for (const c of claims) {
        const thumb = (photosByClaim[c.claim_number] || [])[0];
        const thumbUrl = thumb?.image_url || '';
        const isVoiceClaim = c.source === 'voice';
        const row = el('div', {
          class: 'timeline-row' + (isVoiceClaim ? ' is-voice' : ''),
          onclick: () => openClaimDetail(c.claim_number),
          title: isVoiceClaim ? 'Ver detalle completo del reporte' : 'Ver detalle del siniestro',
        },
          thumbUrl
            ? el('img', { class: 'timeline-thumb', src: thumbUrl, alt: '', loading: 'lazy' })
            : el('div', { class: 'timeline-thumb' }),
          el('div', { class: 'timeline-body' },
            el('div', { class: 'timeline-folio' }, c.claim_number),
            el('div', { class: 'timeline-desc' },
              `${incidentLabel(c.accident?.type)} · ${c.accident?.city || c.accident?.location || '—'} · ${fmtDate(c.accident?.date || c.created_at)}`),
          ),
          el('div', {},
            el('div', { class: 'timeline-cost' }, fmtCOPMillions(c.cost?.final_cop)),
            el('span', { class: `timeline-status ${c.status}` }, c.status?.replace('_', ' ') || '—'),
          ),
        );
        timeline.appendChild(row);
      }
    }
  } catch (e) {
    console.error('showCustomer360', e);
    panel.classList.remove('skeleton');
    panel.innerHTML = '<p class="muted">No se pudo cargar la vista 360.</p>';
  }
}

function kpi(value, label) {
  return el('div', { class: 'kpi' },
    el('div', { class: 'kpi-v' }, String(value)),
    el('div', { class: 'kpi-l' }, label),
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
      $(`tab-${btn.dataset.tab}`).classList.remove('hidden');
    });
  });
}

// ── Hybrid Search ─────────────────────────────────────────────────────────────
function setupSearch() {
  $('search-btn').addEventListener('click', () => runSearch($('search-input').value.trim()));
  $('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') runSearch($('search-input').value.trim());
  });
  document.querySelectorAll('.hint').forEach(b => {
    b.addEventListener('click', () => {
      $('search-input').value = b.dataset.q;
      runSearch(b.dataset.q);
    });
  });
}

async function runSearch(query) {
  if (!query) return;
  const results = $('search-results');
  const meta = $('search-meta');
  results.innerHTML = '<p class="muted">Buscando con Voyage Multimodal-3...</p>';
  meta.classList.add('hidden');

  const t0 = performance.now();
  try {
    const r = await fetch(`${API}/search/text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit: 10 }),
    }).then(r => r.json());

    const ms = Math.round(performance.now() - t0);
    meta.classList.remove('hidden');
    meta.innerHTML = `
      <span>⚡</span>
      <strong>${r.results_count}</strong> fotos en <strong>${r.claims_count}</strong> siniestros ·
      <strong>${ms}ms</strong> · Atlas Vector Search + Voyage
    `;

    results.innerHTML = '';
    if (!r.photos || r.photos.length === 0) {
      results.innerHTML = '<p class="muted">Sin coincidencias. Intenta describir otra escena.</p>';
      return;
    }
    for (const p of r.photos) {
      const snap = p._snapshot || {};
      const row = el('div', { class: 'result-row' },
        p.image_url
          ? el('img', { class: 'result-thumb', src: p.image_url, alt: '', loading: 'lazy' })
          : el('div', { class: 'result-thumb' }),
        el('div', { class: 'result-body' },
          el('div', { class: 'result-folio' }, `${p.claim_number} · ${p.policy_number || '—'}`),
          el('div', { class: 'result-meta' },
            el('span', { class: 'pill' }, incidentLabel(snap.incident_type)),
            ` ${snap.vehicle_label || '—'} · ${snap.city || '—'}`,
          ),
        ),
        el('div', { class: 'result-score' },
          el('div', { class: `score-pct ${scoreClass(p.score)}` }, scorePct(p.score)),
          el('div', { class: 'score-l' }, 'cosine'),
        ),
      );
      results.appendChild(row);
    }
  } catch (e) {
    console.error('runSearch', e);
    results.innerHTML = '<p class="muted">Error consultando Atlas.</p>';
  }
}

// ── Fraud detection ───────────────────────────────────────────────────────────
function setupFraud() {
  $('fraud-file').addEventListener('change', async e => {
    const f = e.target.files?.[0];
    if (!f) return;
    state.fraudFile = f;
    $('fraud-filename').textContent = f.name;
    state.fraudFileB64 = await fileToB64(f);

    // Preview
    const url = URL.createObjectURL(f);
    const preview = $('fraud-preview');
    preview.classList.remove('hidden');
    preview.innerHTML = '';
    preview.appendChild(el('img', { src: url, alt: '' }));
    preview.appendChild(el('div', { class: 'fraud-preview-info' },
      el('div', {}, el('strong', {}, 'Foto a analizar:')),
      el('div', {}, `${f.name}`),
      el('div', { class: 'muted' }, `${Math.round(f.size / 1024)} KB · ${f.type}`),
    ));

    $('fraud-run-btn').disabled = false;
  });

  $('fraud-run-btn').addEventListener('click', runFraud);
}

async function fileToB64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      // strip data:...;base64, prefix
      const result = r.result;
      const idx = result.indexOf(',');
      resolve(idx >= 0 ? result.slice(idx + 1) : result);
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

async function runFraud() {
  if (!state.fraudFileB64) return;
  const btn = $('fraud-run-btn');
  btn.disabled = true;
  btn.textContent = 'Analizando...';
  const resultDiv = $('fraud-result');
  resultDiv.innerHTML = '<p class="muted">Generando embedding y consultando Atlas...</p>';

  const t0 = performance.now();
  try {
    const r = await fetch(`${API}/fraud-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_base64: state.fraudFileB64,
        mime_type: state.fraudFile.type || 'image/jpeg',
        current_policy_number: $('fraud-policy').value,
        threshold: 0.92,
      }),
    }).then(r => r.json());
    const ms = Math.round(performance.now() - t0);

    const statusIcons = {
      high_risk: '⚠️',
      duplicate_claim: '🔶',
      clean: '✅',
      error: '❌',
    };
    const statusTitles = {
      high_risk: 'ALERTA DE FRAUDE',
      duplicate_claim: 'POSIBLE DUPLICADO',
      clean: 'Sin coincidencias relevantes',
      error: 'Error en el análisis',
    };

    resultDiv.innerHTML = '';
    const card = el('div', { class: `fraud-card ${r.status || 'error'}` },
      el('div', { class: 'fraud-status' },
        statusIcons[r.status] || '•',
        ` ${statusTitles[r.status] || r.status}`,
      ),
      el('div', { class: 'fraud-msg' }, r.message || ''),
    );
    if (r.best_match) {
      card.appendChild(el('div', { class: 'muted', style: 'font-size:0.78rem;' },
        `Mejor coincidencia: ${r.best_match.claim_number} · póliza ${r.best_match.policy_number} · ${scorePct(r.best_match.score)}`,
      ));
    }
    card.appendChild(el('div', { class: 'muted', style: 'font-size:0.72rem;margin-top:8px;' },
      `${ms}ms · threshold ${(r.threshold_used * 100).toFixed(0)}% · Voyage + Atlas Vector Search`,
    ));
    resultDiv.appendChild(card);

    if (r.top_matches && r.top_matches.length > 0) {
      const list = el('div', { class: 'fraud-matches' });
      list.appendChild(el('h3', { class: 'sub-h' }, 'Top coincidencias visuales'));
      for (const m of r.top_matches) {
        const snap = m.snapshot || {};
        const row = el('div', { class: 'fraud-match-row' },
          m.image_url ? el('img', { src: m.image_url, alt: '', loading: 'lazy' }) : el('div'),
          el('div', { class: 'result-body' },
            el('div', { class: 'result-folio' }, `${m.claim_number} · ${m.policy_number}`),
            el('div', { class: 'result-meta' },
              `${snap.vehicle_label || '—'} · ${snap.city || '—'} · ${incidentLabel(snap.incident_type)}`,
            ),
          ),
          el('div', { class: 'result-score' },
            el('div', { class: `score-pct ${scoreClass(m.score)}` }, scorePct(m.score)),
            el('div', { class: 'score-l' }, 'similitud'),
          ),
        );
        list.appendChild(row);
      }
      resultDiv.appendChild(list);
    }
  } catch (e) {
    console.error('runFraud', e);
    resultDiv.innerHTML = '<p class="muted">Error consultando Atlas.</p>';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Analizar similitudes';
  }
}

// ── Live FNOL (footer) ────────────────────────────────────────────────────────
async function loadLiveClaim() {
  try {
    const r = await fetch(`${API}/latest-claim`).then(r => r.json());
    const div = $('live-claim');
    if (!r.found) {
      div.innerHTML = '<p class="muted">Esperando llamadas... Marca el número para iniciar un reporte de voz.</p>';
      return;
    }
    const c = r.claim || {};
    const cs = c.customer_snapshot || {};
    const v = c.vehicle || {};
    const acc = c.accident || {};
    const adj = c.adjuster || {};

    div.innerHTML = '';
    const card = el('div', { class: 'live-claim-card' },
      el('div', { class: 'live-claim-folio' }, c.claim_number),
      el('div', {},
        el('div', { class: 'live-claim-field-l' }, 'Asegurado'),
        el('div', { class: 'live-claim-field-v' }, cs.full_name || '—'),
      ),
      el('div', {},
        el('div', { class: 'live-claim-field-l' }, 'Vehículo'),
        el('div', { class: 'live-claim-field-v' }, `${v.year || ''} ${v.make || ''} ${v.model || ''}`.trim()),
      ),
      el('div', {},
        el('div', { class: 'live-claim-field-l' }, 'Ubicación'),
        el('div', { class: 'live-claim-field-v' }, acc.location || '—'),
      ),
      el('div', {},
        el('div', { class: 'live-claim-field-l' }, 'Perito'),
        el('div', { class: 'live-claim-field-v' }, `${adj.name || '—'} · ${adj.eta_minutes || '?'}m`),
      ),
    );
    div.appendChild(card);
  } catch (e) {
    console.error('loadLiveClaim', e);
  }
}

// ── Drill-down modal ──────────────────────────────────────────────────────────
const STATUS_LABELS = {
  whatsapp_pending: { text: 'Esperando WhatsApp', cls: 'amber' },
  intake: { text: 'Recibido', cls: 'amber' },
  inspection_scheduled: { text: 'Inspección agendada', cls: 'amber' },
  under_review: { text: 'En revisión', cls: 'amber' },
  evidence_complete: { text: 'Evidencia completa', cls: 'success' },
  settled: { text: 'Cerrado', cls: 'success' },
};
const PLAN_LABELS = {
  todo_riesgo: 'Todo Riesgo',
  rc_amplia: 'RC Amplia',
  perdida_total: 'Pérdida Total',
};

function setupModal() {
  $('detail-close').addEventListener('click', closeDetail);
  $('detail-overlay').addEventListener('click', e => {
    if (e.target.id === 'detail-overlay') closeDetail();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !$('detail-overlay').classList.contains('hidden')) closeDetail();
  });
  // Modal tabs
  document.querySelectorAll('.modal-tab').forEach(b => {
    b.addEventListener('click', () => switchModalTab(b.dataset.mtab));
  });
}

function switchModalTab(name) {
  document.querySelectorAll('.modal-tab').forEach(b => b.classList.toggle('active', b.dataset.mtab === name));
  document.querySelectorAll('.mtab-panel').forEach(p => p.classList.add('hidden'));
  $(`mtab-${name}`).classList.remove('hidden');
}

function closeDetail() {
  $('detail-overlay').classList.add('hidden');
}

async function openClaimDetail(claimNumber) {
  // Reset
  switchModalTab('data');
  $('detail-folio').textContent = claimNumber;
  $('detail-overlay').classList.remove('hidden');

  // Fetch claim + conversation en paralelo
  try {
    const [claimR, convR, eventsR] = await Promise.all([
      fetch(`${API}/claim/${encodeURIComponent(claimNumber)}`).then(r => r.json()),
      fetch(`${API}/conversation/${encodeURIComponent(claimNumber)}`).then(r => r.json()),
      fetch(`${API}/events/${encodeURIComponent(claimNumber)}`).then(r => r.json()),
    ]);
    if (!claimR.found || !claimR.claim) {
      $('mtab-data').innerHTML = '<p class="muted">No se pudo cargar el siniestro.</p>';
      return;
    }
    renderClaimDetail(claimR.claim, convR, eventsR);
  } catch (e) {
    console.error('openClaimDetail', e);
  }
}

function renderClaimDetail(claim, conv, eventsR) {
  const cs = claim.customer_snapshot || {};
  const v = claim.vehicle || {};
  const acc = claim.accident || {};
  const adj = claim.adjuster || {};
  const ph = claim.policyholder || {};
  const cov = ph.coverage || {};
  const photosReceived = (claim.whatsapp?.photos_received || []);

  // Hero status pill
  const pill = $('detail-status-pill');
  const info = STATUS_LABELS[claim.status] || { text: claim.status?.replace('_', ' ') || '—', cls: 'amber' };
  pill.textContent = info.text;
  pill.className = `status-pill ${info.cls}`;

  // Hero grid
  const hero = $('modal-hero-grid');
  hero.innerHTML = '';
  hero.appendChild(heroItem('Asegurado', cs.full_name || ph.insured?.full_name || '—'));
  hero.appendChild(heroItem('Vehículo', `${v.year || ''} ${v.make || ''} ${v.model || ''}`.trim() || '—'));
  hero.appendChild(heroItem('Ubicación', acc.location || '—'));
  hero.appendChild(heroItem('Perito · ETA', adj.name ? `${adj.name} · ${adj.eta_minutes || '?'}min` : '—'));

  // Datos panel
  renderKV('kv-accident', [
    ['Tipo', incidentLabel(acc.type)],
    ['Ciudad', acc.city || '—'],
    ['Ubicación', acc.location || '—'],
    ['Descripción', acc.description || '—'],
    ['Fecha', fmtDateTime(acc.date || claim.created_at)],
    ['Lesionados', acc.injuries_reported ? 'Sí — atención requerida' : 'No'],
    ['Terceros', acc.third_parties_involved ? 'Sí' : 'No'],
    ['Vehículo manejable', acc.vehicle_drivable === false ? 'No' : 'Sí'],
    ['Canal FNOL', claim.source === 'voice' ? 'Voz SURA' : (claim.source || '—')],
  ]);
  renderKV('kv-policyholder', [
    ['Nombre', cs.full_name || ph.insured?.full_name || '—'],
    ['Cédula', cs.cedula || ph.insured?.cedula || '—'],
    ['Teléfono', maskPhone(cs.phone || ph.insured?.phone)],
    ['Email', cs.email || ph.insured?.email || '—'],
    ['Póliza', claim.policy_number || '—'],
    ['Cobertura', PLAN_LABELS[cov.plan] || cov.plan || '—'],
    ['Vigencia', cov.start_date || cov.end_date
      ? `${fmtDate(cov.start_date)} → ${fmtDate(cov.end_date)}` : '—'],
    ['Suma asegurada', cov.sum_insured_cop ? fmtCOPMillions(cov.sum_insured_cop) : '—'],
    ['Reportes previos', claim.previous_claims_count ?? 0],
  ]);
  renderKV('kv-vehicle', [
    ['Marca', v.make || '—'],
    ['Modelo', v.model || '—'],
    ['Año', v.year || '—'],
    ['Color', v.color || '—'],
    ['Placa', v.plate || '—'],
  ]);
  renderKV('kv-adjuster', [
    ['Nombre', adj.name || '—'],
    ['ETA', adj.eta_minutes ? `${adj.eta_minutes} min` : '—'],
    ['Teléfono', maskPhone(adj.phone)],
    ['Asignado', adj.assigned_at ? fmtDateTime(adj.assigned_at) : '—'],
    ['Estado', adj.assigned_at ? 'En camino' : 'Pendiente'],
  ]);

  // Voice tab
  const voice = (conv?.voice || []);
  $('mcount-voice').textContent = voice.length;
  const vList = $('conv-voice-list');
  const vEmpty = $('conv-voice-empty');
  vList.innerHTML = '';
  if (voice.length === 0) {
    vEmpty.classList.remove('hidden');
  } else {
    vEmpty.classList.add('hidden');
    for (const m of voice) vList.appendChild(voiceBubble(m));
  }

  // WhatsApp tab
  const wa = (conv?.whatsapp || []);
  $('mcount-whatsapp').textContent = wa.length;
  const waList = $('conv-wa-list');
  const waEmpty = $('conv-wa-empty');
  waList.innerHTML = '';
  if (wa.length === 0) {
    waEmpty.classList.remove('hidden');
  } else {
    waEmpty.classList.add('hidden');
    for (const m of wa) waList.appendChild(waBubble(m));
  }

  // Photos tab — combina photos_received + sura_claim_photos del conv
  const allPhotos = [];
  for (const p of (conv?.photos || [])) allPhotos.push(p);
  // Inferred desde photos_received si conv no las tiene
  for (const p of photosReceived) {
    if (!allPhotos.some(x => x.image_url === p.image_url)) {
      allPhotos.push({
        image_url: p.image_url || '',
        description: p.description || '',
        received_at: p.received_at,
        type: p.type,
      });
    }
  }
  $('mcount-photos').textContent = allPhotos.length;
  const pGrid = $('photos-grid');
  const pEmpty = $('photos-empty');
  pGrid.innerHTML = '';
  if (allPhotos.length === 0) {
    pEmpty.classList.remove('hidden');
  } else {
    pEmpty.classList.add('hidden');
    for (const p of allPhotos) {
      const card = el('div', { class: 'photo-card' },
        p.image_url
          ? el('img', { src: p.image_url, alt: '', onclick: () => window.open(p.image_url, '_blank') })
          : el('div', { style: 'aspect-ratio:4/3;background:var(--bg);' }),
        el('div', { class: 'photo-meta' },
          el('div', {}, p.description || p.type || 'Foto'),
          el('div', { class: 'muted', style: 'font-size:0.7rem;' },
            p.received_at ? fmtDateTime(p.received_at) : ''),
        ),
      );
      pGrid.appendChild(card);
    }
  }

  // Events tab
  const events = eventsR?.events || claim.events || [];
  $('mcount-events').textContent = events.length;
  const eList = $('events-list');
  const eEmpty = $('events-empty');
  eList.innerHTML = '';
  if (events.length === 0) {
    eEmpty.classList.remove('hidden');
  } else {
    eEmpty.classList.add('hidden');
    for (const e of events) {
      const note = e.data?.note || '';
      const li = el('li', { class: 'event-row' },
        el('div', { class: 'event-time' }, fmtTime(e.created_at)),
        el('div', {},
          el('div', { class: 'event-type' }, e.event_type),
          el('div', { class: 'event-actor' }, `${e.actor_name || '—'} (${e.actor_type || '—'})`),
          note ? el('div', { class: 'event-note' }, note) : null,
        ),
      );
      eList.appendChild(li);
    }
  }
}

function heroItem(label, value) {
  return el('div', {},
    el('div', { class: 'hero-l' }, label),
    el('div', { class: 'hero-v' }, value),
  );
}
function renderKV(elId, rows) {
  const dl = $(elId);
  dl.innerHTML = '';
  for (const [k, v] of rows) {
    dl.appendChild(el('dt', {}, k));
    dl.appendChild(el('dd', {}, v ?? '—'));
  }
}
function maskPhone(p) {
  if (!p) return '—';
  return p; // no mask en la demo — mostramos el real
}
function fmtTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function waBubble(m) {
  const dir = m.direction === 'out' ? 'out' : 'in';
  const time = m.created_at ? fmtTime(m.created_at) : '';
  const actor = m.direction === 'out' ? 'SURA' : 'Asegurado';
  const bubble = el('div', { class: 'conv-msg-bubble' });
  if (m.type === 'image' && m.image_url) {
    if (m.content) bubble.appendChild(el('div', {}, m.content));
    bubble.appendChild(el('img', {
      class: 'conv-msg-image', src: m.image_url, alt: '',
      onclick: () => window.open(m.image_url, '_blank'),
    }));
  } else {
    bubble.innerHTML = String(m.content || '').replace(/\n/g, '<br>');
  }
  return el('div', { class: `conv-msg ${dir}` },
    bubble,
    el('div', { class: 'conv-msg-meta' }, `${actor} · ${time}`),
  );
}
function voiceBubble(m) {
  const dir = m.role === 'assistant' ? 'out' : 'in';
  const actor = m.role === 'assistant' ? 'SURA' : 'Asegurado';
  const ts = m.timestamp ? fmtTime(m.timestamp) : '';
  const bubble = el('div', { class: 'conv-msg-bubble' });
  bubble.innerHTML = String(m.content || '').replace(/\n/g, '<br>');
  return el('div', { class: `conv-msg ${dir}` },
    bubble,
    el('div', { class: 'conv-msg-meta' }, `${actor}${ts ? ' · ' + ts : ''}`),
  );
}

// ── MongoDB document viewer ───────────────────────────────────────────────────
let _mongoCollapsed = true; // claims/photos arrays empiezan colapsados
let _mongoLastDoc = null;

function setupMongoViewer() {
  const btn = $('view-mongo-doc');
  if (btn) btn.addEventListener('click', openMongoViewer);
  const closeBtn = $('mongo-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMongoViewer);
  const overlay = $('mongo-overlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target.id === 'mongo-overlay') closeMongoViewer();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay && !overlay.classList.contains('hidden')) {
      closeMongoViewer();
    }
  });
  document.querySelectorAll('.modal-tab[data-mongotab]').forEach(b => {
    b.addEventListener('click', () => switchMongoTab(b.dataset.mongotab));
  });
  const copyBtn = $('copy-json-btn');
  if (copyBtn) copyBtn.addEventListener('click', copyMongoJson);
  const toggleBtn = $('toggle-collapse-btn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleMongoCollapse);
}

function switchMongoTab(name) {
  document.querySelectorAll('.modal-tab[data-mongotab]').forEach(b =>
    b.classList.toggle('active', b.dataset.mongotab === name)
  );
  document.querySelectorAll('.mongotab-panel').forEach(p => p.classList.add('hidden'));
  $(`mongotab-${name}`).classList.remove('hidden');
}

function closeMongoViewer() {
  $('mongo-overlay').classList.add('hidden');
}

async function openMongoViewer() {
  const policy = state.currentPolicy || 'SR-CL-100001';
  $('mongo-overlay').classList.remove('hidden');
  $('mongo-subtitle').textContent = `policyholder.sura · ${policy}`;
  $('mongo-stats').innerHTML = '<div class="mongo-stat"><div class="mongo-stat-v">...</div><div class="mongo-stat-l">Cargando</div></div>';
  $('mongo-json').textContent = 'Cargando...';
  $('mongo-pipeline').textContent = '';
  switchMongoTab('json');

  try {
    const r = await fetch(`${API}/customer-360-debug/${encodeURIComponent(policy)}`).then(r => r.json());
    _mongoLastDoc = r.document;

    // Stats
    const c = r.counts || {};
    const kb = ((r.size_bytes || 0) / 1024).toFixed(1);
    $('mongo-stats').innerHTML = '';
    addMongoStat(`${kb} KB`, 'tamaño del doc');
    addMongoStat(c.top_level_fields ?? '—', 'campos top-level');
    addMongoStat(c.embedded_claims ?? '—', 'claims embebidos');
    addMongoStat(c.embedded_photos ?? '—', 'fotos linkadas');
    addMongoStat(`${c.queries_against_db ?? 1} · 0 JOINs`, 'consulta');

    // JSON con syntax highlight (colapsado por default los arrays grandes)
    $('mongo-json').innerHTML = highlightJsonCollapsed(r.document, _mongoCollapsed);

    // Pipeline
    $('mongo-pipeline').innerHTML = highlightPipeline(r.pipeline || '');
  } catch (e) {
    console.error('openMongoViewer', e);
    $('mongo-json').textContent = 'Error cargando el documento.';
  }
}

function addMongoStat(value, label) {
  const stats = $('mongo-stats');
  stats.appendChild(el('div', { class: 'mongo-stat' },
    el('div', { class: 'mongo-stat-v' }, String(value)),
    el('div', { class: 'mongo-stat-l' }, label),
  ));
}

function toggleMongoCollapse() {
  _mongoCollapsed = !_mongoCollapsed;
  $('toggle-collapse-btn').textContent = _mongoCollapsed ? '↕ Expandir todo' : '↕ Colapsar arrays';
  if (_mongoLastDoc) {
    $('mongo-json').innerHTML = highlightJsonCollapsed(_mongoLastDoc, _mongoCollapsed);
  }
}

async function copyMongoJson() {
  if (!_mongoLastDoc) return;
  try {
    await navigator.clipboard.writeText(JSON.stringify(_mongoLastDoc, null, 2));
    const btn = $('copy-json-btn');
    const orig = btn.textContent;
    btn.textContent = '✓ Copiado';
    setTimeout(() => { btn.textContent = orig; }, 1500);
  } catch (e) {
    console.error(e);
  }
}

// Syntax-highlight para JSON. Marca:
//  .k = keys, .s = strings, .n = numbers, .b = booleans, .null, .p = puntuación
function escapeHtml(s) {
  return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

function highlightJsonCollapsed(obj, collapseArrays = true) {
  // Arrays "grandes" (claims, photos) se muestran colapsados con "..."
  const BIG_ARRAY_KEYS = new Set(['claims', 'photos']);

  function render(v, indent, parentKey) {
    const pad = ' '.repeat(indent);
    if (v === null) return `<span class="null">null</span>`;
    if (typeof v === 'boolean') return `<span class="b">${v}</span>`;
    if (typeof v === 'number') return `<span class="n">${v}</span>`;
    if (typeof v === 'string') return `<span class="s">"${escapeHtml(v)}"</span>`;
    if (Array.isArray(v)) {
      if (v.length === 0) return '<span class="p">[]</span>';
      if (collapseArrays && BIG_ARRAY_KEYS.has(parentKey) && v.length > 2) {
        return `<span class="p">[</span> <span class="comment">// ${v.length} items — click "Expandir todo" para ver</span>\n${pad}  ${render(v[0], indent + 2, null)}<span class="p">,</span>\n${pad}  <span class="comment">... ${v.length - 1} más</span>\n${pad}<span class="p">]</span>`;
      }
      const items = v.map(item => pad + '  ' + render(item, indent + 2, null));
      return '<span class="p">[</span>\n' + items.join('<span class="p">,</span>\n') + '\n' + pad + '<span class="p">]</span>';
    }
    if (typeof v === 'object') {
      const keys = Object.keys(v);
      if (keys.length === 0) return '<span class="p">{}</span>';
      const lines = keys.map(k => {
        const kHtml = `<span class="k">"${escapeHtml(k)}"</span><span class="p">:</span> `;
        return pad + '  ' + kHtml + render(v[k], indent + 2, k);
      });
      return '<span class="p">{</span>\n' + lines.join('<span class="p">,</span>\n') + '\n' + pad + '<span class="p">}</span>';
    }
    return escapeHtml(String(v));
  }
  return render(obj, 0, null);
}

function highlightPipeline(text) {
  // Resaltado simple para mongo pipeline: $operators, strings, comments
  let out = escapeHtml(text);
  // Comentarios //
  out = out.replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');
  // Strings entre comillas dobles
  out = out.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, '<span class="s">"$1"</span>');
  // $operators ($match, $lookup, $addFields, $size, $filter, etc.)
  out = out.replace(/(\$[a-zA-Z]+)/g, '<span class="k">$1</span>');
  // Keywords MongoDB
  out = out.replace(/\b(db|aggregate|from|localField|foreignField|as|pipeline|cond|input|in)\b/g,
    '<span class="b">$1</span>');
  return out;
}
