<?php

try {
$pdo = new PDO('mysql:host=localhost;dbname=fluide_et_libre', 'root', '');
$listeStmts = $pdo->prepare('SELECT * from article ORDER BY article_id DESC');
$listeStmts->execute();
$listeArticles = $listeStmts->fetchAll(PDO::FETCH_ASSOC);

header('Content-type: application/json');
echo json_encode($listeArticles);

} catch (Exception $e) {
echo json_encode(['err' => $e->getMessage()]);
}

?>