<?php
    include './components/header.php';
    if (array_key_exists('page', $_GET)) {
    switch ($_GET['page'])  {
        case 'article-list' :
            include './components/liste_articles.php';
            break;
        case 'exercise' :
            include './components/exercices.php';
            break;
        case 'article' :
            include './components/article.php';
            break;
        default :
            include './components/homepage.php';
            break;
            
    };
    } else {
        include './components/homepage.php';
    };    
    include './components/footer.php';
?>
      