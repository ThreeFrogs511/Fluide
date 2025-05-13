<?php

try {
$pdo= new PDO('mysql:host=localhost;dbname=fluide_et_libre', 'root', '');
// on va chercher un article au hasard
$articleStatements = $pdo->prepare('SELECT * from article ORDER BY RAND() LIMIT 1');
$articleStatements->execute();
$article = $articleStatements->fetch(PDO::FETCH_ASSOC);

header('Content-Type: application/json'); // précise qu'on va renvoyer du JSON
echo json_encode($article); // convertit le contenu de $article en objet JSON vers scripts.js

} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]); // si le process échoue, nous renvoie une erreur
}
?>
