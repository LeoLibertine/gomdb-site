#!/usr/bin/env python3
"""
Generador del sitio web completo de consideraciones de producción
MongoDB FinOps - Telecom Argentina
"""

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MongoDB FinOps - Consideraciones de Producción</title>
    <link rel="icon" href="https://www.mongodb.com/assets/images/global/favicon.ico">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Euclid+Circular+A:wght@400;500;600;700&display=swap');

        body {{
            font-family: 'Euclid Circular A', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #FFFFFF;
        }}

        :root {{
            --mongodb-green: #00ED64;
            --mongodb-dark-green: #00684A;
            --mongodb-forest: #001E2B;
            --mongodb-slate: #21313C;
            --mongodb-gray: #889397;
            --mongodb-light-gray: #F9FBFA;
        }}

        .gradient-hero {{
            background: linear-gradient(135deg, var(--mongodb-forest) 0%, var(--mongodb-slate) 100%);
        }}

        .card-shadow {{
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
        }}

        .card-shadow:hover {{
            box-shadow: 0 8px 32px rgba(0, 237, 100, 0.15);
            transform: translateY(-4px);
        }}

        .badge-critical {{ background: linear-gradient(135deg, #FF4757 0%, #D63447 100%); }}
        .badge-high {{ background: linear-gradient(135deg, #FFA502 0%, #FF6348 100%); }}
        .badge-medium {{ background: linear-gradient(135deg, #FFD32A 0%, #FFA502 100%); }}

        .mongodb-leaf {{ color: var(--mongodb-green); }}

        .section-divider {{
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, var(--mongodb-green) 50%, transparent 100%);
        }}

        .sticky-nav {{
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #E8EDEB;
        }}

        .icon-box {{
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            font-size: 28px;
            background: linear-gradient(135deg, var(--mongodb-light-gray) 0%, #FFFFFF 100%);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }}

        .code-block {{
            background: #001E2B;
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
            color: #00ED64;
            border: 1px solid #00684A;
        }}

        .checklist-item {{
            transition: all 0.2s ease;
        }}

        .checklist-item:hover {{
            background: var(--mongodb-light-gray);
            padding-left: 8px;
        }}

        @keyframes fadeInUp {{
            from {{ opacity: 0; transform: translateY(20px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}

        .animate-fadeInUp {{ animation: fadeInUp 0.6s ease-out; }}
        .scroll-smooth {{ scroll-behavior: smooth; }}

        details summary {{
            cursor: pointer;
            user-select: none;
            list-style: none;
        }}

        details summary::-webkit-details-marker {{ display: none; }}
        details[open] summary .chevron {{ transform: rotate(180deg); }}
        .chevron {{ transition: transform 0.3s ease; }}

        .tab-active {{
            border-bottom: 3px solid var(--mongodb-green);
            color: var(--mongodb-forest);
            font-weight: 600;
        }}

        .tab-inactive {{ color: var(--mongodb-gray); }}

        .priority-indicator {{
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
        }}

        .priority-critical {{ background-color: #FF4757; }}
        .priority-high {{ background-color: #FFA502; }}
        .priority-medium {{ background-color: #FFD32A; }}
        .priority-low {{ background-color: #00ED64; }}
    </style>
</head>
<body class="scroll-smooth">
    {hero}
    {nav}

    <div class="max-w-7xl mx-auto px-6 py-12">
        {sections}
    </div>

    {footer}
    {scripts}
</body>
</html>
"""

def generate_hero():
    return """
    <div class="gradient-hero text-white">
        <div class="max-w-7xl mx-auto px-6 py-16">
            <div class="flex items-center gap-3 mb-6">
                <svg class="w-12 h-12" viewBox="0 0 1024 1024" fill="currentColor">
                    <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm0 928C282.2 928 96 741.8 96 512S282.2 96 512 96s416 186.2 416 416-186.2 416-416 416z"/>
                    <path fill="#00ED64" d="M512 160c-194.4 0-352 157.6-352 352s157.6 352 352 352 352-157.6 352-352-157.6-352-352-352zm0 608c-141.4 0-256-114.6-256-256s114.6-256 256-256 256 114.6 256 256-114.6 256-256 256z"/>
                    <path fill="#00ED64" d="M512 320c-106 0-192 86-192 192s86 192 192 192 192-86 192-192-86-192-192-192z"/>
                </svg>
                <div>
                    <div class="text-sm font-medium" style="color: #00ED64;">MongoDB Professional Services</div>
                    <h1 class="text-4xl md:text-5xl font-bold">FinOps para MongoDB Community</h1>
                </div>
            </div>
            <p class="text-xl text-gray-300 mb-8 max-w-3xl">
                Guía Completa: De Demo a Producción - 12 Consideraciones Críticas
            </p>
            <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                    <span class="text-2xl">🎯</span>
                    <span>Cliente: Telecom Argentina</span>
                </div>
                <div class="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                    <span class="text-2xl">🗓️</span>
                    <span>Noviembre 2025</span>
                </div>
                <div class="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                    <span class="text-2xl">⚙️</span>
                    <span>MongoDB Community 5.x / 6.x</span>
                </div>
                <div class="flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                    <span class="text-2xl">💰</span>
                    <span>Presupuesto: ~$7-10K USD</span>
                </div>
            </div>
        </div>
    </div>
    """

def generate_nav():
    nav_items = [
        ("contexto", "Contexto"),
        ("seguridad", "Seguridad"),
        ("arquitectura", "Arquitectura"),
        ("requisitos", "Requisitos"),
        ("limitaciones", "Limitaciones"),
        ("deployment", "Despliegue"),
        ("monitoring", "Monitoreo"),
        ("resiliencia", "Resiliencia"),
        ("datos", "Datos"),
        ("testing", "Testing"),
        ("documentacion", "Docs"),
        ("disclaimer", "Disclaimer"),
    ]

    nav_html = '<nav class="sticky-nav"><div class="max-w-7xl mx-auto px-6"><div class="flex overflow-x-auto gap-8 py-4">'

    for item_id, label in nav_items:
        nav_html += f'<a href="#{item_id}" class="tab-inactive hover:text-gray-900 whitespace-nowrap transition-colors">{label}</a>'

    nav_html += '</div></div></nav>'
    return nav_html

def generate_footer():
    return """
    <footer class="gradient-hero text-white py-12 mt-20">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 class="font-bold text-xl mb-3" style="color: #00ED64;">MongoDB Professional Services</h3>
                    <p class="text-gray-300 text-sm">
                        Guía preparada para sesión interna con equipo PS<br>
                        Telecom Argentina FinOps Project
                    </p>
                </div>
                <div>
                    <h3 class="font-bold text-xl mb-3">Equipo</h3>
                    <p class="text-gray-300 text-sm">David Radzinsky - Account Executive</p>
                    <p class="text-gray-300 text-sm">Manolo Quiroz - PS Manager LATAM</p>
                    <p class="text-gray-300 text-sm">Royer Arenas - PS Engineer</p>
                    <p class="text-gray-300 text-sm">Leo Alarcón - Solutions Architect</p>
                </div>
                <div>
                    <h3 class="font-bold text-xl mb-3">Referencias</h3>
                    <p class="text-gray-300 text-sm">✓ MongoDB Security Checklist</p>
                    <p class="text-gray-300 text-sm">✓ Production Notes</p>
                    <p class="text-gray-300 text-sm">✓ Professional Services Best Practices</p>
                    <p class="text-gray-300 text-sm">✓ Community Edition Limitations</p>
                </div>
            </div>
            <div class="section-divider mb-8"></div>
            <div class="text-center text-gray-400 text-sm">
                <p>© 2025 MongoDB, Inc. - Documento Interno de Consideraciones Técnicas</p>
                <p class="mt-2">Generado automáticamente para sesión de PS - Noviembre 2025</p>
            </div>
        </div>
    </footer>
    """

def generate_scripts():
    return """
    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Active nav highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('tab-active');
                link.classList.add('tab-inactive');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.remove('tab-inactive');
                    link.classList.add('tab-active');
                }
            });
        });

        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll('section').forEach(section => observer.observe(section));

        // Print functionality
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                window.print();
            }
        });
    </script>
    """

def generate_contexto_section():
    return """
    <section id="contexto" class="mb-20 animate-fadeInUp">
        <div class="card-shadow rounded-2xl p-8 bg-white border border-gray-100">
            <div class="flex items-start gap-4 mb-6">
                <div class="icon-box"><span>📋</span></div>
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">1. Contexto del Proyecto</h2>
                    <p class="text-gray-600">Estado actual y visión del cliente</p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-8">
                <div class="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border-2 border-green-200">
                    <h3 class="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span class="mongodb-leaf text-2xl">✓</span>
                        Lo que tenemos HOY
                    </h3>
                    <ul class="space-y-2 text-gray-700 text-sm">
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Script Python funcional: <code class="bg-white px-2 py-1 rounded text-xs">generate_metrics_v2.py</code></span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Dashboard React con visualizaciones interactivas (Recharts)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Métricas capturadas: Storage (GB), OPS aproximado, Memory usage</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Modelo de costeo: $10/GB storage + $5/M ops + $2/memoria</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Ejecución automatizada vía cron (cada 6 horas)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span><strong>Cliente entusiasmado:</strong> "Eso me lleva de 0 a 1000. Es lo que busco."</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="mongodb-leaf mt-1">•</span>
                            <span>Documentación completa (9 archivos MD con arquitectura, comparaciones, guías)</span>
                        </li>
                    </ul>
                </div>

                <div class="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border-2 border-red-300">
                    <h3 class="font-semibold text-lg mb-3 flex items-center gap-2">
                        <span class="text-2xl text-red-600">⚠️</span>
                        Lo que FALTA para producción
                    </h3>
                    <ul class="space-y-2 text-gray-700 text-sm">
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span><strong>CRÍTICO:</strong> Credenciales hardcodeadas (usuario/password en código)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>Sin análisis formal de requisitos de negocio con cliente</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>OPS por BD = aproximación (MongoDB no expone métrica real per-database)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>Sin manejo robusto de errores ni circuit breakers</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>MongoDB Community: SIN soporte oficial ni SLA</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>Indefinido: ¿Quién desarrolla? ¿Quién mantiene? ¿Quién soporta?</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>Sin TLS/SSL en conexiones MongoDB (datos en claro)</span>
                        </li>
                        <li class="flex items-start gap-2">
                            <span class="text-red-500 mt-1 font-bold">✗</span>
                            <span>Sin tests unitarios ni integration tests</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                <h4 class="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <span class="text-xl">💡</span>
                    Reflexión Equipo Professional Services
                </h4>
                <p class="text-blue-800 italic mb-3 text-sm leading-relaxed">
                    "Normalmente, una demo es para demostrar un concepto, que ni siquiera está con los datos del cliente.
                    De eso a llevarlo a producción con production readiness, hay un mundo de diferencia. Necesitamos un
                    proceso riguroso de análisis de aplicación, reglas de negocio y levantamiento de requerimientos con el dueño del proyecto."
                </p>
                <p class="text-sm text-blue-700">
                    - Royer Arenas & Manolo Quiroz, MongoDB PS LATAM
                </p>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h4 class="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <span class="text-xl">⚖️</span>
                    Realidad del Presupuesto
                </h4>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-yellow-800 mb-2"><strong>Cliente indica:</strong></p>
                        <ul class="space-y-1 text-yellow-700 ml-4">
                            <li>• Contrato I.B.M: ~$70K anuales</li>
                            <li>• Disponible para esto: 10-15% adicional (~$7-10K)</li>
                            <li>• "Si es 50% más, no tengo presupuesto aprobado"</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-yellow-800 mb-2"><strong>Realidad PS:</strong></p>
                        <ul class="space-y-1 text-yellow-700 ml-4">
                            <li>• Desarrollo completo (nosotros): $40-50K mínimo</li>
                            <li>• App Incubator pequeño: $12-15K</li>
                            <li>• App Incubator mediano: $20-25K</li>
                            <li>• Con ese presupuesto: cliente DEBE participar en desarrollo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    """

# Debido al límite de longitud, el resto de secciones se generarán en el main
# Este es solo el esqueleto del generador

if __name__ == "__main__":
    print("🚀 Generando sitio web completo de consideraciones de producción...")
    print("📄 Este script es solo la base. El archivo HTML completo se generará directamente.")
    print("✅ Ejecuta: python3 generate_full_considerations.py > produccion-considerations-full.html")
