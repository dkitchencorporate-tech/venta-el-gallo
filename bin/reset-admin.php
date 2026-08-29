<?php
// SCRIPT CLI DE RESCATE ADMINISTRATIVO VÍA SSH
// Uso exclusivo para karc0 y Antigravity en caso de emergencia
// Comando: php bin/reset-admin.php --email=info@cuevaventaelgallo.es --password="NuevaPassword2026."

if (php_sapi_name() !== 'cli') {
    die("Acceso denegado. Este script solo puede ejecutarse desde la terminal SSH.\n");
}

require_once __DIR__ . '/../api/config.php';

$options = getopt('', ['email:', 'password:']);
$email = $options['email'] ?? ADMIN_EMAIL;
$password = $options['password'] ?? '';

if (!$password) {
    die("Error: Debes especificar una nueva contraseña.\nEjemplo: php bin/reset-admin.php --email=info@cuevaventaelgallo.es --password=\"NuevaPassword2026.\"\n");
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

$stmt = $pdo->prepare("UPDATE admin_users SET password_hash = :hash, updated_at = datetime('now') WHERE email = :email");
$stmt->execute([':hash' => $hash, ':email' => $email]);

if ($stmt->rowCount() > 0) {
    echo "========================================================\n";
    echo "[RESCATE EXITOSO] Contraseña actualizada para: $email\n";
    echo "Ya puedes iniciar sesión en https://cuevaventaelgallo.es/#/admin/login\n";
    echo "========================================================\n";
} else {
    // Si no existía, crear el usuario
    $insert = $pdo->prepare("INSERT INTO admin_users (email, password_hash) VALUES (:email, :hash)");
    $insert->execute([':email' => $email, ':hash' => $hash]);
    echo "[RESCATE EXITOSO] Usuario $email creado y contraseña configurada.\n";
}
