
# 🧭 Guía básica para colaborar en el proyecto GoMDB

---

## 👣 Paso 1: Conectarse al repositorio de GitHub

1. **Instalar Git** (si no lo tienes):  
   👉 https://git-scm.com/downloads

2. **Clonar el repositorio en tu computadora:**

   ```bash
   git clone https://github.com/LeoLibertine/gomdb-site.git
   cd gomdb-site

	3.	Ya estás dentro del proyecto, listo para trabajar.

⸻

📄 Paso 2: ¿Dónde está el contenido por cliente?

Todo el contenido público y visual por cliente vive en esta ruta:

public/clientes/<nombre-del-cliente>/

Aquí puedes agregar o modificar:
	•	Archivos HTML
	•	Imágenes (PNG, JPG, SVG)
	•	PDFs
	•	Videos u otros recursos estáticos

Ejemplo:

public/clientes/cencosud/presentacion.html
public/clientes/segurosbolivar/logo.png


⸻

✏️ Paso 3: ¿Cómo agregar o modificar contenido?
	1.	Crea o edita el archivo dentro de la carpeta del cliente:

nano public/clientes/cencosud/nuevo-reporte.html


	2.	Guarda los cambios.
	3.	Luego en la terminal:

git add public/clientes/cencosud/nuevo-reporte.html
git commit -m "Agrega nuevo reporte para Cencosud"
git push origin main



⸻

🧪 Paso 4: ¿Cómo correr el sitio localmente?

Si quieres visualizar el contenido en tu computadora antes de subirlo:
	1.	Instala un servidor local (una sola vez):

npm install -g serve


	2.	Corre el sitio desde la carpeta public:

serve public


	3.	Abre tu navegador en:

http://localhost:3000/clientes/cencosud/nuevo-reporte.html



⸻

💬 Dudas o soporte

Si tienes dudas o necesitas ayuda mientras Leo está fuera:
	•	Contacto: leo.alarcon@mongodb.com
	•	También puedes crear un Issue aquí:
👉 https://github.com/LeoLibertine/gomdb-site/issues

⸻

GoMDB — porque los clientes no deberían perderse entre carpetas.

---

### 💾 Paso 3: Guardar y salir de `nano`

Presiona:

- `Ctrl + O` → Enter para guardar
- `Ctrl + X` para salir

---

### ✅ Paso 4: Sube el archivo a GitHub

```bash
git add GUIA_COLABORADORES.md
git commit -m "Agrega guía básica para colaboradores"
git push origin main



⸻

🔧 Sección adicional para tu guía: Agregar nuevas páginas y actualizar vercel.json

⸻

🧩 Agregar nuevas páginas y actualizar rutas en producción

Cuando agregas una nueva página HTML en la carpeta de un cliente, también debes registrar su ruta en el archivo vercel.json, de lo contrario la URL limpia no funcionará correctamente en producción.

⸻

📍¿Dónde está este archivo?

vercel.json

Contiene una sección llamada "rewrites" como esta:

{
  "src": "/clientes/yape/propuesta-final(?:/.*)?$",
  "dest": "/clientes/yape/propuesta-final.html"
}


⸻

➕ ¿Cómo agregar una nueva página?

Supongamos que creaste este archivo nuevo:

public/clientes/etb/nueva-estrategia.html

Entonces debes agregar esta regla en vercel.json dentro del arreglo "rewrites":

{
  "src": "/clientes/etb/nueva-estrategia(?:/.*)?$",
  "dest": "/clientes/etb/nueva-estrategia.html"
}

📌 Repite este paso por cada archivo HTML nuevo que quieras que tenga una ruta limpia en la web.

⸻

✅ Pasos completos:
	1.	Edita o agrega el archivo HTML en la carpeta correspondiente.
	2.	Edita vercel.json y añade una regla de rewrite para esa nueva ruta.
	3.	Guarda los cambios.
	4.	En la terminal:

git add public/clientes/etb/nueva-estrategia.html vercel.json
git commit -m "Agrega nueva estrategia de ETB y regla de rewrite"
git push origin main

	5.	Vercel detectará el cambio y desplegará automáticamente.

⸻

🧪 Prueba rápida

Después del despliegue, verifica que esta URL funcione:

https://gomdb.com/clientes/etb/nueva-estrategia

Aunque el archivo sea .html, gracias al rewrite se verá como una ruta “limpia”.

⸻
