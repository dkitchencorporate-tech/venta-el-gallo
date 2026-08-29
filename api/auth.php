<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? 'login';
$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

// 1. Iniciar Sesión
if ($action === 'login') {
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['error' => 'Email y contraseña requeridos.']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $token = generate_jwt(['user_id' => $user['id'], 'email' => $user['email']]);
        echo json_encode([
            'success' => true,
            'token' => $token,
            'user' => ['email' => $user['email']]
        ]);
        exit;
    }

    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas. Compruebe email y contraseña.']);
    exit;
}

// 2. Solicitar Enlace de Recuperación
if ($action === 'request-reset') {
    $email = trim($input['email'] ?? '');

    // Anti-Enumeración: Si coincide con el admin, generar token y enviar
    if ($email === ADMIN_EMAIL) {
        $raw_token = bin2hex(random_bytes(32));
        $token_hash = hash('sha256', $raw_token);
        $expires = date('Y-m-d H:i:s', time() + (15 * 60)); // 15 minutos

        // Invalidar tokens previos
        $pdo->prepare("UPDATE password_resets SET used = 1 WHERE email = :email")->execute([':email' => $email]);

        // Guardar nuevo token atómico
        $stmt = $pdo->prepare("INSERT INTO password_resets (email, token_hash, expires_at) VALUES (:email, :hash, :exp)");
        $stmt->execute([':email' => $email, ':hash' => $token_hash, ':exp' => $expires]);

        // Enviar Correo Oficial
        $reset_link = "https://cuevaventaelgallo.es/#/admin/reset-password?token=" . $raw_token;
        $subject = "Recuperación de Contraseña - Admin Venta El Gallo";
        $message = "Hola,\n\nHas solicitado restablecer la contraseña del panel de administración de Venta El Gallo.\n\nHaz clic en el siguiente enlace de un solo uso (válido por 15 minutos):\n" . $reset_link . "\n\nSi no has solicitado este cambio, puedes ignorar este correo de forma segura.";
        $headers_mail = "From: no-reply@cuevaventaelgallo.es\r\nReply-To: " . ADMIN_EMAIL;
        
        @mail($email, $subject, $message, $headers_mail);
    }

    // Respuesta genérica siempre para protección total
    echo json_encode([
        'success' => true,
        'message' => 'Si el correo coincide con el administrador, recibirás un enlace de recuperación en tu bandeja de entrada.'
    ]);
    exit;
}

// 3. Confirmar Nueva Contraseña
if ($action === 'confirm-reset') {
    $raw_token = trim($input['token'] ?? '');
    $new_password = $input['password'] ?? '';

    if (!$raw_token || strlen($new_password) < 6) {
        http_response_code(400);
        echo json_encode(['error' => 'Token inválido o contraseña demasiado corta (mínimo 6 caracteres).']);
        exit;
    }

    $token_hash = hash('sha256', $raw_token);
    $now = date('Y-m-d H:i:s');

    $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token_hash = :hash AND used = 0 AND expires_at > :now");
    $stmt->execute([':hash' => $token_hash, ':now' => $now]);
    $reset_req = $stmt->fetch();

    if (!$reset_req) {
        http_response_code(400);
        echo json_encode(['error' => 'El enlace de recuperación es inválido o ha expirado. Por favor solicita uno nuevo.']);
        exit;
    }

    // Transacción Atómica
    $pdo->beginTransaction();
    try {
        $new_hash = password_hash($new_password, PASSWORD_BCRYPT, ['cost' => 12]);
        $pdo->prepare("UPDATE admin_users SET password_hash = :hash, updated_at = :now WHERE email = :email")
            ->execute([':hash' => $new_hash, ':now' => $now, ':email' => $reset_req['email']]);

        $pdo->prepare("UPDATE password_resets SET used = 1 WHERE id = :id")
            ->execute([':id' => $reset_req['id']]);

        $pdo->commit();

        echo json_encode(['success' => true, 'message' => 'Contraseña actualizada con éxito. Ya puedes iniciar sesión.']);
        exit;
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar contraseña.']);
        exit;
    }
}

// 4. Verificar Sesión Activa
if ($action === 'verify') {
    $auth = require_auth();
    echo json_encode(['success' => true, 'user' => $auth]);
    exit;
}
