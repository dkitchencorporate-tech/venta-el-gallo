<?php
require_once __DIR__ . '/config.php';

// Requiere autenticación de administrador
$auth = require_auth();

$action = $_GET['action'] ?? 'upload';
$uploads_dir = __DIR__ . '/../uploads';
if (!is_dir($uploads_dir)) {
    mkdir($uploads_dir, 0755, true);
}

// 1. Subir Imagen desde el Dispositivo
if ($action === 'upload' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'No se ha recibido ninguna imagen válida.']);
        exit;
    }

    $file = $_FILES['image'];
    $allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $allowed_types)) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato no permitido. Solo se aceptan JPG, PNG, WEBP.']);
        exit;
    }

    // Tamaño máximo 5MB
    if ($file['size'] > 5 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'La imagen supera el tamaño máximo permitido (5MB).']);
        exit;
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'veg_' . uniqid() . '_' . time() . '.' . strtolower($ext);
    $target = $uploads_dir . '/' . $filename;

    if (move_uploaded_file($file['tmp_name'], $target)) {
        $public_url = '/uploads/' . $filename;
        echo json_encode([
            'success' => true,
            'url' => $public_url,
            'filename' => $filename
        ]);
        exit;
    }

    http_response_code(500);
    echo json_encode(['error' => 'Error al guardar la imagen en el servidor.']);
    exit;
}

// 2. Eliminar Imagen Huérfana cuando se borra un artista o elemento de carrusel
if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $filename = basename($input['filename'] ?? '');

    if ($filename && file_exists($uploads_dir . '/' . $filename)) {
        @unlink($uploads_dir . '/' . $filename);
        echo json_encode(['success' => true, 'message' => 'Archivo eliminado del servidor.']);
        exit;
    }

    echo json_encode(['success' => true, 'message' => 'Archivo no requería limpieza.']);
    exit;
}
