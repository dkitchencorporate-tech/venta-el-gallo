# CONTROL DE DESPLIEGUE Y ACTUALIZACIONES (VENTA EL GALLO)

> [!IMPORTANT]
> **DOCUMENTO CRÍTICO DE INFRAESTRUCTURA.**
> Este documento contiene el flujo exacto para que cualquier Agente IA o Desarrollador futuro sepa cómo compilar, actualizar y desplegar el código en el servidor de producción (IONOS). **No alterar sin conocimiento técnico.**

## 1. Arquitectura Base
- **Tipo de Proyecto:** React + Vite (Single Page Application - SPA).
- **Rutas:** React Router con modo Hash (`/#/`) para evitar problemas de enrutamiento del servidor de IONOS.
- **Carpeta de Compilación:** Todo el código listo para producción se genera en la carpeta `dist/`.

## 2. Flujo de Actualización de Código
Si se realiza un cambio en el código (ej. modificar `InteractiveMenu.jsx` o CSS):
1. Abrir terminal en `C:\Users\architectsys\Desktop\venta-el-gallo\`.
2. Ejecutar comando de compilación:
   ```bash
   npm run build
   ```
   *Esto generará los archivos minimizados en `/dist`.*

## 3. Despliegue a Producción (IONOS)
Hemos construido un script automatizado hiper-rápido basado en SSH2-SFTP que sube **únicamente** los archivos que han cambiado, sin tener que usar FileZilla ni arrastrar carpetas.

Para desplegar a producción:
1. Asegurarse de que el archivo `.env` en la raíz del proyecto contenga las credenciales correctas (SFTP_HOST, SFTP_USER, SFTP_PASS).
2. Ejecutar:
   ```bash
   npm run deploy
   ```
3. El script (`scripts/deploy.cjs`) escaneará la carpeta `dist/` local y la comparará con el directorio público en IONOS, subiendo solo lo necesario.

## 4. Reglas Críticas del Servidor (El Archivo `.htaccess`)
El servidor web de IONOS utiliza Apache y es extremadamente estricto. Hemos configurado el archivo `public/.htaccess` para resolver problemas de indexación SEO (redirecciones 301).

> [!CAUTION]
> **PELIGRO DE ERROR 500 (Internal Server Error)**
> IONOS requiere estrictamente que la directiva `Options +FollowSymLinks` esté al inicio del `.htaccess`. Además, el archivo NO DEBE contener retornos de carro inválidos o saltos de línea mal formateados. 
> 
> **Contenido exacto y validado del `.htaccess` actual:**
> ```apache
> Options +FollowSymLinks
> <IfModule mod_rewrite.c>
>   RewriteEngine On
>   RewriteBase /
>   RewriteCond %{REQUEST_FILENAME} !-f
>   RewriteCond %{REQUEST_FILENAME} !-d
>   RewriteRule ^(.*)$ / [L,R=301]
> </IfModule>
> ```
> Si alguna IA en el futuro edita este archivo y la web cae con un Error 500, la solución inmediata es reescribir este bloque de código sin utilizar editores de flujo (`sed` o `replace_file_content` defectuosos). Usa escritura directa.

## 5. Notas sobre el SEO
El `sitemap.xml` ha sido optimizado para apuntar exclusivamente al dominio raíz. Google Search Console toma días o semanas en procesar estos cambios. No intentar forzar rutas antiguas. Todo el tráfico residual es capturado por el `.htaccess` y redirigido al dominio principal mediante 301.

---
*Firmado: Arquitectura IA - Architect.Sys (Julio 2026)*
