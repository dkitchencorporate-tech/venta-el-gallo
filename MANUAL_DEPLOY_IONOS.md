# 🚀 MANUAL DE DESPLIEGUE A IONOS (SFTP)

> [!CAUTION]
> **REGLA ESTRICTA:** Este repositorio NUNCA se despliega automáticamente desde GitHub. El despliegue a IONOS es **100% MANUAL** usando SFTP para garantizar el control total de la agencia sobre el servidor de producción.

## 🛠️ Método 1: Script Automatizado Local (Recomendado)
El proyecto contiene un script que compila la aplicación y sube directamente los archivos estáticos generados al servidor IONOS.

1. Asegúrate de tener el archivo `.env` configurado con las siguientes credenciales:
   ```env
   IONOS_HOST=tu_servidor_ionos
   IONOS_PORT=22
   IONOS_USER=tu_usuario
   IONOS_PASS=tu_contraseña
   IONOS_PATH=/ruta/al/public_html
   ```
2. Ejecuta en la terminal (desde la raíz del proyecto):
   ```bash
   npm run deploy
   ```
   *Esto internamente ejecuta `npm run build` y luego ejecuta `node scripts/deploy.cjs` que sube la carpeta `/dist`.*

## 📂 Método 2: Manual por FileZilla
Si el script falla o necesitas hacerlo de manera visual:
1. Corre localmente: `npm run build`. Esto generará la carpeta `/dist/`.
2. Abre FileZilla y conéctate al servidor IONOS.
3. Arrastra y suelta el **contenido** de la carpeta `/dist/` (NO la carpeta `dist` per se, sino lo que hay dentro: `index.html`, `assets/`, etc.) en el `public_html` (o carpeta raíz) de IONOS.
4. Asegúrate de que el archivo `.htaccess` esté en la raíz del servidor para que React Router funcione.

> [!IMPORTANT]
> Nunca subas la carpeta `node_modules`, ni el `package.json`, ni el `.env` a IONOS. IONOS solo sirve archivos estáticos (HTML/CSS/JS) para esta Single Page Application.
