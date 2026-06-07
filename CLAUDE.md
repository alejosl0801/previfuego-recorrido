# Previfuego Recorrido — Memoria del Proyecto

> Lee esto COMPLETO al iniciar cualquier sesión nueva. Contiene todo el contexto acumulado.

## ¿Qué es esta app?

PWA para empresa de extintores Previfuego. Permite:
- **Admin (Alejandro)**: Crear recorridos diarios por VOZ usando Gemini AI, marcar clientes visitados del mes, ver seguimiento en tiempo real.
- **Técnicos (Raúl, Juan)**: Ver su recorrido asignado y marcar cada punto como "✓ Listo".

**URL producción**: https://alejosl0801.github.io/previfuego-recorrido/
**Repo**: https://github.com/alejosl0801/previfuego-recorrido
**Rama de desarrollo**: `claude/dreamy-cannon-lhDPq` → merge a `main`

## Archivos principales

| Archivo | Rol |
|---------|-----|
| `index.html` | Estructura HTML — 3 pantallas: s0 (login), s1 (técnico), sadmin (admin) |
| `app.js` | Toda la lógica JS (~1100 líneas) |
| `style.css` | Estilos |
| `sw.js` | Service Worker, CACHE_VERSION='1.1' |
| `manifest.json` | PWA manifest |
| `icon-192.png` / `icon-512.png` | Íconos generados con Node.js + zlib |

## Arquitectura técnica

- **Dropbox OAuth PKCE** (sin client_secret en frontend) — token permanente via refresh_token en localStorage
- **Dropbox App Key**: `alxflmx4qckl5gb` (público, OK en código)
- **SheetJS** (xlsx-0.20.3) para parsear Excel desde Dropbox
- **Web Speech API** (SpeechRecognition) para voz, lang='es-EC'
- **Gemini 2.0 Flash API** para interpretar instrucciones de voz y seleccionar clientes

## Archivos en Dropbox

| Path Dropbox | Contenido |
|---|---|
| `/Previfuego/recorridos.json` | Recorridos diarios `{ "07/06/2026": { puntos: [...] } }` |
| `/Previfuego/config.json` | Config cross-device `{ gemini_key: "..." }` |
| `/Previfuego/visitas.json` | Visitas del mes `{ "JUNIO_2026": { "NombreCliente": { visitado: true, fecha: "..." } } }` |
| `/Previfuego/2026/BASE_DATOS_KFC (8).xlsx` | Base clientes KFC (puede cambiar nombre — ver Config tab) |
| `/Previfuego/PRESUPUESTOS/PROYECCION INGRESOS MENSUAL 2026.xlsx` | Base otros clientes |

## SEGURIDAD — CRÍTICO

- **Clave Gemini**: Se configura desde el tab ⚙️ Config → campo "Clave Gemini AI" → "Guardar clave Gemini"
  - NUNCA va en app.js ni ningún archivo de GitHub
  - Se guarda SOLO en `localStorage('pf_gemini_key')` y en `/Previfuego/config.json` en Dropbox
  - Alejandro la ingresó una vez y queda guardada permanentemente en Dropbox
- **Dropbox App Secret**: NUNCA en el código (no necesario con PKCE) — consúltalo en Dropbox App Console
- **Tokens Dropbox**: Solo en localStorage del dispositivo

## Flujo de tabs Admin

```
[ Clientes ] [ 🎤 Voz ] [ Seguimiento ] [ ⚙️ ]
```

### Tab "Clientes"
- Muestra todos los clientes del mes (KFC + Otros) cargados desde Excel en Dropbox
- Admin puede marcar cada uno como "Visitado" → se guarda en `/Previfuego/visitas.json`
- Contador: "X visitados / Y pendientes"

### Tab "🎤 Voz"
1. Admin pulsa botón micrófono
2. SpeechRecognition captura instrucción (ej: "pon los KFC pendientes de Guayaquil")
3. Se llama Gemini 2.0 Flash con lista completa de clientes como contexto
4. Gemini devuelve array JSON de índices `[0, 3, 7]`
5. Se muestra preview con los clientes seleccionados + selector de técnico por cliente
6. Admin pulsa "Publicar" → sube a `/Previfuego/recorridos.json`

### Tab "Seguimiento"
- Tabla en tiempo real de todos los puntos del día
- Se actualiza cada 30 segundos
- Muestra contadores por técnico

### Tab "⚙️"
- Conexión Dropbox (OAuth PKCE)
- Campo para guardar clave Gemini (nunca se muestra, solo se guarda)
- Rutas de archivos Excel configurables
- Botones para listar carpetas Dropbox y encontrar nombre exacto de archivos

## Variables de estado globales (app.js)

```js
USUARIO_ACTUAL      // string: 'alejandro' | 'raul' | 'juan'
PUNTOS              // array: recorrido del técnico actual
CLIENTES_DISPONIBLES // array: todos los clientes del mes
VISITAS_MES         // object: { "NombreCliente": { visitado: true, fecha: "..." } }
RUTA_PREVIEW        // array: clientes seleccionados por Gemini para publicar
```

## Funciones clave en app.js

| Función | Qué hace |
|---|---|
| `cargarClientes()` | Descarga Excel KFC + Otros + visitas.json de Dropbox, renderiza tab Clientes |
| `marcarVisitado(idx)` | Toggle visitado/pendiente, guarda en Dropbox |
| `iniciarVoz()` | Activa SpeechRecognition |
| `procesarInstruccionVoz(texto)` | Llama Gemini API con contexto de clientes |
| `renderRutaPreview()` | Muestra clientes seleccionados por Gemini |
| `publicarRutaPreview()` | Publica ruta en recorridos.json en Dropbox |
| `sincronizarConfig()` | Al login admin, descarga config.json y restaura clave Gemini |
| `guardarGeminiKey()` | Guarda clave en localStorage + Dropbox config.json |
| `subirFichas()` | Cuando técnico marca listo, sube estado a Dropbox (debounced 800ms) |

## Errores conocidos / soluciones aplicadas

- **Dropbox 400/409 en archivo no existente**: `dbxDownload()` maneja status 400/409, lee texto, si dice 'not_found' devuelve null → `dbxDownloadJSON` devuelve `{}`
- **recorridos.json no existe (primer uso)**: Tratado como vacío, muestra "Sin recorrido"
- **Re-publicar borra progreso técnico**: `publicarRutaPreview()` descarga estado existente y preserva `done:true`
- **Token Dropbox expira**: `refreshAccessToken()` con `invalid_grant` limpia tokens y muestra modal para reconectar
- **Nombre exacto archivo KFC**: Usar "Ver 2026/" en Config para ver nombre exacto, luego ajustar path

## Git workflow

```bash
# Siempre en esta rama
git checkout claude/dreamy-cannon-lhDPq

# Verificar syntax antes de commit
node --check app.js

# Commit + push
git add -A
git commit -m "descripción"
git push -u origin claude/dreamy-cannon-lhDPq

# Merge a main cuando esté listo
git checkout main
git merge claude/dreamy-cannon-lhDPq
git push -u origin main
```

**Git identity para commits**:
```bash
git config user.email noreply@anthropic.com
git config user.name Claude
```

## Historial de sesiones

### Sesión 1-3 (contexto comprimido)
- Se creó la PWA completa desde cero
- Implementado OAuth PKCE Dropbox
- Implementado parseo Excel con SheetJS
- Implementado seguimiento en tiempo real
- Corregidos múltiples bugs (400/409, merge conflicts, token refresh, debounce subirFichas)

### Sesión 4 (2026-06-07)
- Reemplazado sistema de checkboxes por Voice + Gemini AI
- Nuevos tabs: Clientes | 🎤 Voz | Seguimiento | ⚙️
- Tab Clientes: marcar visitados del mes → visitas.json en Dropbox
- Tab Voz: SpeechRecognition → Gemini 2.0 Flash → preview → publicar
- Clave Gemini: guardada solo en localStorage + Dropbox config.json (NUNCA en código)
- Agregada función `sincronizarConfig()` para restaurar clave Gemini al iniciar sesión admin
- CLAUDE.md creado como memoria permanente entre sesiones

## Instrucción permanente del usuario

> "ESCOGE LA MEJOR OPCION SIEMPRE TU SIN PREGUNTARME"

El usuario prefiere que Claude tome decisiones técnicas de forma autónoma.
