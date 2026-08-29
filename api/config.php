<?php
// Configuración Central de Seguridad y Conexión SQLite - Venta El Gallo

// 1. CORS Headers Restringidos
$allowed_origins = [
    'https://dkitchencorporate-tech.github.io',
    'https://cuevaventaelgallo.es',
    'http://localhost:5173',
    'http://localhost:3000'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Clave Secreta para Tokens HMAC (Cambiar en despliegue si se desea)
define('JWT_SECRET', 'veg_sacromonte_auth_secret_key_2026_luxury_secure_token');
define('ADMIN_EMAIL', 'info@cuevaventaelgallo.es');

// 3. Inicialización y Conexión PDO SQLite
$db_dir = __DIR__ . '/../.data';
if (!is_dir($db_dir)) {
    mkdir($db_dir, 0700, true);
}
$db_file = $db_dir . '/ventaelgallo.db';

try {
    $pdo = new PDO("sqlite:" . $db_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Crear tablas base si no existen (Esquema Atómico)
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS password_resets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            token_hash TEXT NOT NULL,
            expires_at DATETIME NOT NULL,
            used INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS dishes (
            id TEXT PRIMARY KEY,
            scope TEXT NOT NULL,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            desc TEXT,
            price TEXT,
            allergens TEXT,
            order_num INTEGER DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS artists (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            imageUrl TEXT,
            description TEXT,
            order_num INTEGER DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS site_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Asegurar usuario admin por defecto si está vacío
    $checkUser = $pdo->prepare("SELECT COUNT(*) as total FROM admin_users WHERE email = :email");
    $checkUser->execute([':email' => ADMIN_EMAIL]);
    if ($checkUser->fetch()['total'] == 0) {
        $default_hash = password_hash('Ventaelgallo_2026_admin.', PASSWORD_BCRYPT, ['cost' => 12]);
        $insertUser = $pdo->prepare("INSERT INTO admin_users (email, password_hash) VALUES (:email, :hash)");
        $insertUser->execute([':email' => ADMIN_EMAIL, ':hash' => $default_hash]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error de conexión a base de datos', 'details' => $e->getMessage()]);
    exit;
}

// 4. Funciones Criptográficas Auxiliares
function generate_jwt($payload) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload['exp'] = time() + (86400 * 7); // 7 días de validez
    $payload_json = json_encode($payload);

    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload_json));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function verify_jwt($token) {
    if (!$token) return false;
    $parts = explode('.', $token);
    if (count($parts) !== 3) return false;

    list($base64UrlHeader, $base64UrlPayload, $base64UrlSignature) = $parts;
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $expectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

    if (!hash_equals($expectedSignature, $base64UrlSignature)) return false;

    $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $base64UrlPayload)), true);
    if (!$payload || !isset($payload['exp']) || $payload['exp'] < time()) return false;

    return $payload;
}

function require_auth() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        $payload = verify_jwt($matches[1]);
        if ($payload) return $payload;
    }
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado. Token de sesión inválido o expirado.']);
    exit;
}
