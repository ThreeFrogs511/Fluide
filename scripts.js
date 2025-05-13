import {articleAleatoire, listerArticles, expire, inspire, annulé, filtreArticles, previewClean} from "./functions.js"


//système de slide-in pour menu nav
let hamburger = document.querySelector(".menuNav button");
let menuNav = document.querySelector(".menuNav nav");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active")
    menuNav.classList.toggle("displayNav");
    if (menuNav.classList.contains("displayNav") && hamburger.classList.contains("is-active")) {
        menuNav.innerHTML = `<a href="index.html">Accueil</a>
        <a href="liste_articles.html">Articles</a>
        <a href="exercices.html">Exercices</a>
        `
    } else {
        menuNav.innerHTML = '';
    }

})


    
// article aléatoire
let articleUne = document.querySelector(".articleUne")
articleAleatoire(articleUne);
//-- changer d'article au clic
if (articleUne !== null) {
articleUne.addEventListener("click", (event) => {
if (event.target.classList.contains("random")) {
    articleAleatoire(articleUne);
}
})
}

/* on récup la totalité des articles */
const response2 = await fetch("GET_liste_articles.php");
const liste = await response2.json();
let listeArticles = document.querySelector(".listeArticles");


//listing des articles

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

//search bar - afficher les résultats en temps réel
if(menuNav.innerHTML !== '' && listeArticles !== null) {
    let searchBar = document.querySelector(".searchBar")
    searchBar.addEventListener("input", (event) => {
        const recherche = event.target.value.trim().toLowerCase();

        if (!recherche) {
            listeArticles.innerHTML = ''
            listerArticles(listeArticles, liste)} 

        const resultat = liste.filter( function(article) {
             return article.title.toLowerCase().startsWith(recherche)})
            
                    listeArticles.innerHTML = "";
       
                    if (resultat.length > 0) {
                    listerArticles(listeArticles, resultat);
                    } else {
                        listeArticles.innerHTML = `<p>Aucun article trouvé pour “${event.target.value}”.</p>`;
                    }
           
 })
}

    
    

/* article choisi par l'user */
let sectionArticle = document.querySelector(".article");
if (sectionArticle !== null) { // pour vérifier qu'on se trouve sur la bonne page

const searchParams = new URLSearchParams(window.location.search); // on récupère l'id dans le lien
let articleId = searchParams.get('article_id');

//On envoie en suite l'id via POST pour récupérer l'article choisi par l'user
const response3 = await fetch("GET_article.php", {
    method : "POST",
    headers: {"Content-type" : "application/json"},
    body: JSON.stringify(articleId)
});
// on attend le retour de fetch() puis on génère l'article
let article = await response3.json();
sectionArticle.innerHTML = `<br><h3>${article.title}</h3> <br>${article.article_body}<br> `;

}

/* cercle de respiration */

async function boucleCercle(div) {
    annulé.stop = false;
    while (!annulé.stop && div.classList.contains("cercleAnimation")) {
        await expire(div);
        if (annulé.stop) break;
        await inspire(div);
    }
}

let exercice = document.querySelector(".exercice");
if (exercice !== null) {
    let div = document.createElement("div");
    div.classList.add("cercle");
    div.innerHTML=`<p>Cliquez ici</p>`;
    exercice.appendChild(div);

    div.addEventListener("click", () => {
        div.classList.toggle("cercleAnimation");
        
        if (div.classList.contains("cercleAnimation")) {
            boucleCercle(div);  
        } else {
            annulé.stop = true;
            div.innerHTML=`<p>Cliquez ici</p>`;
        }
    });
}
    

