<?php
require_once __DIR__ . '/config.php';

$type = $_GET['type'] ?? 'all';
$method = $_SERVER['REQUEST_METHOD'];

// 1. OBTENER CONTENIDO (PÚBLICO PARA TODOS LOS VISITANTES)
if ($method === 'GET') {
    if ($type === 'all') {
        $stmt = $pdo->query("SELECT key, value FROM site_settings WHERE key IN ('artists', 'menu', 'carousel')");
        $results = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

        $response = [
            'success' => true,
            'artists' => isset($results['artists']) ? json_decode($results['artists'], true) : null,
            'menu' => isset($results['menu']) ? json_decode($results['menu'], true) : null,
            'carousel' => isset($results['carousel']) ? json_decode($results['carousel'], true) : null,
            'timestamp' => time()
        ];
        echo json_encode($response);
        exit;
    }

    if (in_array($type, ['artists', 'menu', 'carousel'])) {
        $stmt = $pdo->prepare("SELECT value FROM site_settings WHERE key = :key");
        $stmt->execute([':key' => $type]);
        $row = $stmt->fetch();
        echo json_encode([
            'success' => true,
            'data' => $row ? json_decode($row['value'], true) : null
        ]);
        exit;
    }

    http_response_code(400);
    echo json_encode(['error' => 'Tipo de contenido no soportado.']);
    exit;
}

// 2. GUARDAR CONTENIDO (REQUIERE AUTENTICACIÓN ADMIN)
if ($method === 'POST') {
    $auth = require_auth();
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['data'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos o vacíos.']);
        exit;
    }

    if (!in_array($type, ['artists', 'menu', 'carousel'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Tipo de contenido no válido para guardar.']);
        exit;
    }

    $json_value = json_encode($input['data'], JSON_UNESCAPED_UNICODE);

    $stmt = $pdo->prepare("
        INSERT INTO site_settings (key, value, updated_at) 
        VALUES (:key, :value, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET 
            value = excluded.value, 
            updated_at = datetime('now')
    ");
    $stmt->execute([':key' => $type, ':value' => $json_value]);

    echo json_encode([
        'success' => true,
        'message' => "Contenido de {$type} guardado con persistencia atómica en SQLite.",
        'updated_at' => date('Y-m-d H:i:s')
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Método no permitido.']);
