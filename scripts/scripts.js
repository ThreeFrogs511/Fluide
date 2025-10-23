import {articleAleatoire, listerArticles, annulé, filtreArticles, boucleCercle} from "./functions.js"

//hamburger menu
let hamburger = document.querySelector(".menuNav button");
let menuNav = document.querySelector(".menuNav nav");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    menuNav.classList.toggle("displayNav");
    if (menuNav.classList.contains("displayNav") && hamburger.classList.contains("is-active")) {
        menuNav.innerHTML = `
        <a href="?page=homepage">Accueil</a>
        <a href="?page=article-list">Articles</a>
        <a href="?page=exercise">Exercices</a>
        `;
    } else {
        menuNav.innerHTML = '';
    }

})


    
// displaying a random article on the homepage
let articleUne = document.querySelector(".articleUne");
articleAleatoire(articleUne); // function that handle the randomization


// changing articles
if (articleUne) {
    articleUne.addEventListener("click", (e) => {
        e.target.classList.contains("random") && articleAleatoire(articleUne);
    });
};

// fetching all the articles
const response2 = await fetch("./backend/GET_liste_articles.php");
const liste = await response2.json();
let listeArticles = document.querySelector(".listeArticles");
//displaying them
listerArticles(listeArticles, liste);

// filtrer
if (listeArticles !== null){
    let filtrer = document.querySelector(".filtrer");
    let choix = document.getElementById("menuCategorie")
    filtrer.addEventListener("click", () => {
     choix.classList.toggle("choixHidden")
     choix.classList.toggle("choixFiltre")
    
    })

    filtreArticles(choix, liste, listeArticles)
}

//The search bar display the corresponding results in real time
if (listeArticles) { // if at least one article exists

    let searchBar = document.querySelector(".searchBar"); // the search bar
    //we listen to the input (real time)
    searchBar.addEventListener("input", (event) => {
        const recherche = event.target.value.trim().toLowerCase();
        //if the search input is empty, we reset
        if (!recherche) {
            listeArticles.innerHTML = '';
            listerArticles(listeArticles, liste);
            return;
        } else {
            const resultat = liste.filter( function(article) {
                return article.title.toLowerCase().startsWith(recherche);
            });
            listeArticles.innerHTML = ""; //We clear the container
            if (resultat.length > 0) {
                listerArticles(listeArticles, resultat);
            } else {
                //if no corresponding articles have been found
                listeArticles.innerHTML=`<p>Aucun article trouvé pour “${event.target.value}”.</p>`;
            }
        };    
    });
};

    
    

// display the chosen article
let sectionArticle = document.querySelector(".article"); 
if (sectionArticle) { 
    //the URLSearchParams API allows us to get the id in the URL and display the correspond article
    //dynamically
    const searchParams = new URLSearchParams(window.location.search);
    let articleId = searchParams.get('article_id');
    //We fetch the right article using a PHP API and the id
    const response3 = await fetch("./backend/GET_article.php", {
        method : "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(articleId)
    });
    let article = await response3.json();
    //we display the title and the body of the chosen article
    sectionArticle.innerHTML = `<br><h3>${article.title}</h3> <br>${article.article_body}<br> `;
};



/* BREATHING EXERCISE SEGMENT */


//checking if it's the right page
let exercice = document.querySelector(".exercice");
if (exercice) {
    //creating the black square used for the exercise
    let div = document.createElement("div");
    div.classList.add("cercle");
    div.innerHTML=`<p>Cliquez ici</p>`;
    exercice.appendChild(div);

    //On click, we stop or we launch the exercise
    div.addEventListener("click", () => {
        div.classList.toggle("cercleAnimation");
        //if the animation hasn't started, we launch it
        if (div.classList.contains("cercleAnimation")) {
            boucleCercle(div); // function that handle the inhalation and exhalation switch
        } else {
            annulé.stop = true; //variable that stops the breathing exercise
            div.innerHTML=`<p>Cliquez ici</p>`; 
        }
    });
};
    