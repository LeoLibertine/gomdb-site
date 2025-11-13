# 🔐 Nuevos Códigos de Acceso - GoMDB Site

**Fecha de actualización:** 2025-11-12
**Motivo:** Mejora de seguridad y protección del directorio general de clientes

---

## 🚨 IMPORTANTE - Cambios de Seguridad

### ¿Qué cambió?

1. **Directorio de clientes protegido**: La página `/clientes` (directorio completo) ahora requiere el código master de MongoDB. Los clientes YA NO pueden ver la lista completa de otros clientes.

2. **Códigos más robustos**: Todos los códigos de acceso ahora son más seguros (formato: `CLIENTE-hash-año`).

3. **Acceso por cliente**: Cada cliente solo puede ver su propio contenido con su código específico.

---

## 🔑 Nuevos Códigos de Acceso por Cliente

| Cliente | Código Anterior | **Nuevo Código** | Acceso |
|---------|----------------|------------------|--------|
| **Bancolombia** | BCO2025 | `BCO-7k9m2Lx4Pq-2025` | Solo docs Bancolombia |
| **Yape** | YAPE2024 | `YAPE-3n8Hw5Zt6Vr-2024` | Solo docs Yape |
| **Cencosud** | CEN2025 | `CEN-9Qw4Js7Km2Fx-2025` | Solo docs Cencosud |
| **ETB** | ETB2025 | `ETB-6Hx3Mn9Rp5Tw-2025` | Solo docs ETB |
| **Kushki** | KUSH2025 | `KUSH-2Lp8Xv4Qn7Js-2025` | Solo docs Kushki |
| **Seguros Bolívar** | SEG2025 | `SEG-5Zt9Km3Vx8Lw-2025` | Solo docs Seguros Bolívar |
| **PayWay** | PAY2025 | `PAY-4Np7Qr2Xt5Mw-2025` | Solo docs PayWay |
| **BPD** | BPD2025 | `BPD-8Lm3Zv6Qx9Kp-2025` | Solo docs BPD |
| **Coppel** | COP2025 | `COP-7Xw5Mn4Rt8Lp-2025` | Solo docs Coppel |
| **Falape** | FAL2025 | `FAL-3Qv9Kx2Np7Tm-2025` | Solo docs Falape |
| **Bintec** | BIN2025 | `BIN-6Lw4Zt8Mx3Vp-2025` | Solo docs Bintec |

---

## 🔓 Código Master MongoDB (sin cambios)

| Usuario | Código | Acceso |
|---------|--------|--------|
| **MongoDB Internal** | `MDB-MASTER-2025` | TODO (directorio + todos los clientes) |

---

## 📋 Flujo de Acceso Actualizado

### Para Clientes (Ej: BPD)

```
1. Cliente recibe link: https://www.gomdb.com/clientes/bpd
2. Cliente recibe código nuevo: BPD-8Lm3Zv6Qx9Kp-2025
3. Ingresa código → Accede SOLO a contenido BPD
4. Si intenta ir a /clientes → Pide código master (NO lo tiene)
5. ✅ Seguro: Solo ve su contenido, no el de otros clientes
```

### Para MongoDB Internal

```
1. Usuario MongoDB ingresa a https://www.gomdb.com/clientes
2. Ingresa código: MDB-MASTER-2025
3. ✅ Ve directorio completo de todos los clientes
4. Puede navegar a cualquier cliente sin restricciones
```

---

## 🔒 Reglas de Seguridad

### ✅ Ahora SÍ Protegido

- `/clientes` → Requiere código master `MDB-MASTER-2025` (MongoDB internal ONLY)
- `/clientes/bancolombia` → Requiere `BCO-7k9m2Lx4Pq-2025` O código master
- `/clientes/bpd` → Requiere `BPD-8Lm3Zv6Qx9Kp-2025` O código master
- `/clientes/[cualquier-cliente]` → Requiere código del cliente O código master

### ✅ Público (sin código)

- `/` → Landing page (público)
- `/demo` → Demo document (público)
- `/cosmica` → Flappy Leaf game (público)

---

## 📧 Cómo Compartir con Clientes

### Template de Mensaje WhatsApp/Email

```
Hola [Nombre Cliente],

He actualizado el sistema de seguridad del portal GoMDB.

Tu NUEVO código de acceso es:
🔑 [CODIGO-CLIENTE]

Link de acceso directo a tu contenido:
🔗 https://www.gomdb.com/clientes/[cliente]

Notas importantes:
• Los códigos anteriores dejaron de funcionar
• Guarda este código en un lugar seguro
• No compartas el código con terceros
• Si pierdes el código, contáctame para un reset

Saludos,
Leo Alarcón - Solutions Architect MongoDB
```

---

## 🧪 Cómo Probar la Seguridad

### Test 1: Cliente NO puede ver directorio

```bash
1. Abrir ventana de incógnito
2. Ir a https://www.gomdb.com/clientes
3. Ingresar código de cliente (ej: BPD-8Lm3Zv6Qx9Kp-2025)
4. ❌ Debería RECHAZAR (solo master code funciona)
```

### Test 2: Cliente puede ver su contenido

```bash
1. Abrir ventana de incógnito
2. Ir a https://www.gomdb.com/clientes/bpd
3. Ingresar código BPD: BPD-8Lm3Zv6Qx9Kp-2025
4. ✅ Debería ACEPTAR y mostrar contenido BPD
```

### Test 3: Master code funciona en todo

```bash
1. Abrir ventana de incógnito
2. Ir a https://www.gomdb.com/clientes
3. Ingresar código master: MDB-MASTER-2025
4. ✅ Debería mostrar directorio completo
5. Navegar a cualquier cliente
6. ✅ Debería entrar directo sin pedir código de nuevo
```

### Test 4: Códigos viejos NO funcionan

```bash
1. Abrir ventana de incógnito
2. Ir a https://www.gomdb.com/clientes/bpd
3. Ingresar código VIEJO: BPD2025
4. ❌ Debería RECHAZAR (código deshabilitado)
```

---

## 🛠️ Para Desarrolladores

### Limpiar localStorage (testing)

```javascript
// En consola del browser
localStorage.clear()
// O específico por cliente
localStorage.removeItem('access_bpd')
localStorage.removeItem('access_mongodb_master')
```

### Verificar código almacenado

```javascript
// En consola del browser
localStorage.getItem('access_bpd')
localStorage.getItem('access_mongodb_master')
```

---

## 📊 Resumen de Cambios Técnicos

### Archivos Modificados

1. **`src/constants/accessCodes.js`**
   - Actualizados todos los códigos a formato hash seguro
   - Mantenido código master sin cambios

2. **`src/App.jsx`**
   - Agregado `<ProtectedRoute>` a la ruta `/clientes`
   - Ahora requiere `client="mongodb"` (solo master code)

3. **`src/hooks/useAuth.js`**
   - Sin cambios (ya funciona correctamente)

---

## 🚀 Deployment

```bash
# Build OK
npm run build
✓ built in 4.34s

# Deploy automático al hacer push a main
git add .
git commit -m "security: actualiza códigos de acceso y protege directorio clientes"
git push origin main

# Vercel detecta y despliega automáticamente
# URL: https://www.gomdb.com
```

---

## 📝 Checklist Post-Deployment

- [ ] Limpiar localStorage en todos los browsers de prueba
- [ ] Probar acceso con CADA código nuevo de cliente
- [ ] Probar que `/clientes` solo funciona con master code
- [ ] Probar que códigos viejos NO funcionan
- [ ] Enviar nuevos códigos a TODOS los clientes
- [ ] Actualizar documentación interna de MongoDB
- [ ] Guardar backup de este documento en Drive/Confluence

---

## 🆘 Troubleshooting

### "Mi código no funciona"

1. Verifica que estás usando el NUEVO código (con guiones y letras/números)
2. Limpia localStorage: `localStorage.clear()`
3. Refresca la página (Cmd+R o Ctrl+R)
4. Intenta en ventana de incógnito
5. Verifica que estás en la URL correcta del cliente

### "Puedo ver otros clientes"

❌ **BUG** - No debería pasar. Contactar a Leo inmediatamente.

### "No puedo acceder al directorio"

✅ **ESPERADO** - Si eres cliente, NO deberías poder ver `/clientes`
✅ **SOLUCIÓN** - Si eres MongoDB, usa código master: `MDB-MASTER-2025`

---

**Autor:** Leo Alarcón - Solutions Architect MongoDB
**Email:** leo.alarcon@mongodb.com
**Última actualización:** 2025-11-12
