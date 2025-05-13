<?php

try {
$data = json_decode(file_get_contents('php://input'), true);
$pdo= new PDO('mysql:host=localhost;dbname=fluide_et_libre', 'root', '');
$articleStatements = $pdo->prepare('SELECT * from article WHERE is_enabled = TRUE AND article_id = :article_id');
$articleStatements->execute([
    'article_id' => $data
]);
$article = $articleStatements->fetch(PDO::FETCH_ASSOC);
header('Content-type: application/json');
echo json_encode($article);

} catch (Exception $e) {
echo json_encode(['err'=> $e->getMessage()]);
}