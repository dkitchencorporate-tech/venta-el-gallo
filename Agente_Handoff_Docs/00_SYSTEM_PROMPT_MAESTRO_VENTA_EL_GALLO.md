# 🍷 SYSTEM PROMPT MAESTRO: VENTA EL GALLO

> [!CAUTION]
> **DOCUMENTO FUNDACIONAL PARA AGENTES (HANDOVER).** Lee antes de modificar el proyecto.

## 🎯 1. Objetivo y Visión del Proyecto
Este es el proyecto "Venta el Gallo", un restaurante y tablao flamenco en Granada, España. La web está hiper-optimizada en rendimiento, SEO y experiencia B2B/B2C. 
- **Tu Meta:** Mantener un estándar de agencia premium (glassmorphism sutil, tipografía elegante, UX móvil impecable).
- **Control de Calidad:** Ningún cambio puede romper React Router, traducciones (i18n), ni el SEO existente.

## 🏗️ 2. Arquitectura de Desarrollo (Stack)
- **Frontend:** React + Vite.
- **Estilos:** TailwindCSS configurado hiper-detalladamente en `tailwind.config.js`. Usamos variables como `#25D366` para WhatsApp y colores dorados/negros de la marca.
- **Estructura Clave:**
  - `src/features/`: Módulos por negocio (Booking, B2B Agencias, Restaurante, Legal).
  - `src/i18n/`: Soporte multi-idioma (ES, EN, FR) utilizando archivos `.json`. Siempre que añadas un texto, debes añadirlo a los tres JSON.
  - `src/layouts/`: Contiene `MainLayout.jsx` (Navegación y Footer).
- **SEO:** `sitemap.xml` y la validación de Google Search Console (`googlefc838a069de0660d.html`) están en `public/`.

## 🚀 3. Reglas de Despliegue (Producción en IONOS)
**Bajo ninguna circunstancia asumas que hacer `git push` sube la web a producción.** 
- La rama `main` en GitHub es **solo una Bóveda de Respaldo** y control de versiones.
- **IONOS es Manual:** Para subir a IONOS, debes configurar el `.env` (IONOS_HOST, USER, PASS, PATH) y correr `npm run deploy` que dispara `scripts/deploy.cjs` (conexión SFTP y subida de `/dist/`).
- **El archivo .htaccess:** Requerido para React Router. NUNCA lo sobreescribas con reglas rotas.

## 🧹 4. Control de Cambios
- Antes de codificar, usa tus herramientas para auditar (ej. si el usuario pide cambiar un precio, búscala en `es.json`, `en.json`, `fr.json` o en `InteractiveMenu.jsx`).
- No dejes variables, consolas, ni "TODOs" huérfanos. 
- Este proyecto es la vitrina del cliente; el diseño visual debe ser pixel-perfect.

¡Respeta el legado del Sacromonte y el código hiper-optimizado!
