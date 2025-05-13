//générer des articles aléatoires
export async function articleAleatoire(articleUne) {
const response = await fetch("GET_article_aleatoire.php");
let article = await response.json();
if (window.localStorage.getItem("id") === null) {
    console.log("pas d'id, on stocke")
    window.localStorage.setItem("id", article.article_id)
    if (articleUne !== null ) {
        articleUne.innerHTML = '',
        articleUne.innerHTML =  `<h2 class="random">Article aléatoire</h2> <br><h3 data-user-id = ${article.article_id}>${article.title}</h3> <br>${article.article_body} `;
    }
       
} else {
if (parseInt(window.localStorage.getItem("id")) === article.article_id) {
    console.log("même id, on recommence")
articleAleatoire(articleUne);
   } else {
    console.log("pas la même id, on autorise")
    articleUne.innerHTML = '',
    articleUne.innerHTML =  `<h2 class="random">Article aléatoire</h2> <br><h3 data-user-id = ${article.article_id}>${article.title}</h3> <br>${article.article_body} `;
    window.localStorage.removeItem("id")
    window.localStorage.setItem("id", article.article_id)
}
}};




/* générer liste d'articles */

// Fct pour que la preview d'article ne coupe pas le mot en plein milieu

export function previewClean(article) {
    let i = 100;
    let body = article.article_body;
    while(i>=100) {
        let char = body.charAt(i);
    if (char !== '.' ) {
        i++;
} else {
   return article.article_body.slice(0,i);
}


}};

// Fct pour lister
export function listerArticles(listeArticles,liste) {
    if (listeArticles !== null) {
        liste.forEach(article => {
            let preview = previewClean(article);
            let a = document.createElement("a")
            a.setAttribute("href",`article.html?article_id=${article.article_id}`);
            a.innerHTML =
            `
            <div class="articlePreview">
            <h3>${article.title}</h3><br>
            <p>${preview}...<p>
            <p class="pseudoArticle">par ${article.pseudo}<p>
            </div>
            `;
            listeArticles.appendChild(a);
        });
        
        } 
}

/* système de filtre d'articles */

//1 - Afficher articles catégorie science :

function categorieScience(listeArticles, liste) {
    listeArticles.innerHTML = "";
const listeFiltree = liste.filter( function(article) {
return article.categorie === "Science"
})
listeFiltree.forEach(articleFiltre => {
    let preview = previewClean(articleFiltre);
    let a = document.createElement("a")
    a.setAttribute("href",`article.html?article_id=${articleFiltre.article_id}`);
    a.innerHTML =
    `
    <div class="articlePreview">
    <h3>${articleFiltre.title}</h3><br>
    <p>${preview}...<p>
    <p class="pseudoArticle">par ${articleFiltre.pseudo}<p>
    </div>
    `;
    listeArticles.appendChild(a);
})
}

//2- Afficher articles catégorie dev perso :

function categorieDevPerso(listeArticles, liste) {
    listeArticles.innerHTML = "";
const listeFiltree = liste.filter( function(article) {
return article.categorie === "Développement personnel"
})
listeFiltree.forEach(articleFiltre => {
    let preview = previewClean(articleFiltre);
    let a = document.createElement("a")
    a.setAttribute("href",`article.html?article_id=${articleFiltre.article_id}`);
    a.innerHTML =
    `
    <div class="articlePreview">
    <h3>${articleFiltre.title}</h3><br>
    <p>${preview}...<p>
    <p class="pseudoArticle">par ${articleFiltre.pseudo}<p>
    </div>
    `;
    listeArticles.appendChild(a);
})
}


// 3- filtrer par catégorie ou reset les filtres
export function filtreArticles(choix, liste, listeArticles) {
choix.addEventListener("click", (event) => {
    if (event.target.classList.contains("science")) {
        categorieScience(listeArticles, liste)
        console.log("science")
}
if (event.target.classList.contains("devPerso")) {
    categorieDevPerso(listeArticles, liste)
    console.log("dev")
}
if (event.target.classList.contains("resetFilter")) {
    listeArticles.innerHTML = "";
    listerArticles(listeArticles,liste)
    console.log("reset")
}
})

}




//Délai entre chaque inspiration/expiration

// tout en haut du fichier
export let annulé = { stop: false };

export function Delai(ms) {
    return new Promise(resolve => {
        let interval = 100;  // vérification toutes les 100ms
        let tempsEcoulé = 0;

        function verifier() {
            if (annulé.stop || tempsEcoulé >= ms) {
                resolve();
            } else {
                tempsEcoulé += interval;
                setTimeout(verifier, interval);
            }
        }
        verifier();
    });
}

/* on promet d'attendre Xms puis de retourner resolve, qui sera alors vide 
car il n'a aucune valeur définie. resolve sert ici à définir la fin de la promesse, son succès
afin de débloquer la suite. Sinon, la promesse ne finira jamais */

//on affiche le msg 'inspire' puis on attends 5s
  export async function expire(div) {
    div.innerHTML = `<p>Inspire</p>`
        await Delai(4500);
        

    }

 
// on affiche le msg 'expire' pusi on attends 10s
  export async function inspire(div) {
    div.innerHTML=`<p>Expire</p>`;
       await Delai(9500);
       
        
    }

/* on attends que la promesse exécute son action, attendre, avec réussite, via resolve
 avant de changer le texte */

    // boucle qui alterne inspire et expire avec délais respectifs. Await pour éviter que ça plante

    /* on n'utilise pas de setTimeout directement dans la boucle sinon ça plante. A la place,
    on insère les deux fonctions asynchrones, correspondantes à chaque texte, avec un await.
    La boucle attendra que chaque fonction finisse sa tâche avant de passer à la suivante, et 
    ce sans planter. Puis, on teste boucle, variable qui lance la boucle. Si false, on stoppe */