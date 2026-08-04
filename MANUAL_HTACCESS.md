# ⚙️ MANUAL DE CONFIGURACIÓN HTACCESS

> [!NOTE]
> Este archivo es crítico para que la aplicación (React Router) funcione en IONOS sin devolver errores `404 Not Found` al refrescar la página.

## Reglas Maestras
El archivo `.htaccess` debe estar ubicado en la carpeta raíz del servidor (`public_html`) junto al archivo `index.html`. 
La configuración de Venta el Gallo debe tener las siguientes directivas para redirigir todo el tráfico interno a `index.html`.

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 🔒 Seguridad Adicional (Opcional)
Si necesitas forzar el redireccionamiento a HTTPS, añade lo siguiente debajo de `RewriteEngine On`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```
