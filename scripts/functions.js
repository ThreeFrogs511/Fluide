

//randomizing front page article
//each randomized article must be different than the previous one
export async function articleAleatoire(articleUne) {
    // we fetch a random article in the database
    const response = await fetch("./backend/GET_article_aleatoire.php");
    let article = await response.json();
    // if no article id is stored in the local storage
    if (!window.localStorage.getItem("id")) {
        window.localStorage.setItem("id", article.article_id);
        // 'articleUne' is the container for the randomized article
        if (articleUne) {
            articleUne.innerHTML = ''; //we clean the container first
            // then we display the randomized article
            articleUne.innerHTML =  `
            <h2 class="random">Article aléatoire</h2> <br><h3 data-user-id = 
            ${article.article_id}>${article.title}</h3> <br>${article.article_body} `;
        }
    //if an article id is stored in the local storage
    } else {
        // if the new article has the same id as the previous one => we try again
        if (parseInt(window.localStorage.getItem("id")) === article.article_id) {
            articleAleatoire(articleUne); // callback. We restart the process.
        } else {
            articleUne && (articleUne.innerHTML = ''); 
            articleUne && (articleUne.innerHTML =  `
            <h2 class="random">Article aléatoire</h2> <br><h3 data-user-id 
            = ${article.article_id}>${article.title}</h3> <br>${article.article_body} `);
            //we store the new article id in the local storage to test it for
            //the next randomization
            window.localStorage.removeItem("id");
            window.localStorage.setItem("id", article.article_id);
        };
    };
};


// prevent the article previews from cutting in the middle of a word
export function previewClean(article) {
    let i = 100;
    let body = article.article_body;
    // we check each character with charAt(i)
    while(i>=100) {
        let char = body.charAt(i);
        if (char !== '.' ) {
            i++;
        } else {
        return article.article_body.slice(0,i);
        }
    }
};

// List all the articles
export function listerArticles(listeArticles,liste) {
    if (listeArticles) {
        liste.forEach(article => {
            let preview = previewClean(article);
            let a = document.createElement("a")
            a.setAttribute("href",`?page=article&article_id=${article.article_id}`);
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
    };
};


//Filtering all but 'science' articles
function categorieScience(listeArticles, liste) {
    listeArticles.innerHTML = "";
    const listeFiltree = liste.filter( function (article) {
    return article.categorie === "Science";
    });
    listeFiltree.forEach(articleFiltre => {
        let preview = previewClean(articleFiltre);
        let a = document.createElement("a")
        a.setAttribute("href",`?page=article&article_id=${articleFiltre.article_id}`);
        a.innerHTML =
        `
        <div class="articlePreview">
        <h3>${articleFiltre.title}</h3><br>
        <p>${preview}...<p>
        <p class="pseudoArticle">par ${articleFiltre.pseudo}<p>
        </div>
        `;
        listeArticles.appendChild(a);
    });
};

//Filtering all but 'développement personnel' articles
function categorieDevPerso(listeArticles, liste) {
    listeArticles.innerHTML = "";
    const listeFiltree = liste.filter( function(article) {
    return article.categorie === "Développement personnel"
    });  
    listeFiltree.forEach(articleFiltre => {
        let preview = previewClean(articleFiltre);
        let a = document.createElement("a")
        a.setAttribute("href",`?page=article&article_id=${articleFiltre.article_id}`);
        a.innerHTML =
        `
        <div class="articlePreview">
        <h3>${articleFiltre.title}</h3><br>
        <p>${preview}...<p>
        <p class="pseudoArticle">par ${articleFiltre.pseudo}<p>
        </div>
        `;
        listeArticles.appendChild(a);
    });
}


//Core filtering function
export function filtreArticles(choix, liste, listeArticles) {
    choix.addEventListener("click", (event) => {
        if (event.target.classList.contains("science")) {
            categorieScience(listeArticles, liste);
        }
        if (event.target.classList.contains("devPerso")) {
            categorieDevPerso(listeArticles, liste);
        }
        if (event.target.classList.contains("resetFilter")) {
            listeArticles.innerHTML = "";
            listerArticles(listeArticles,liste);
        }
    });
};



/* BREATHING EXERCICE FUNCTIONS */

//We use a promise to switch between inhale and exhale.
//A setTimeOut to create delays

export let annulé = { stop: false }; // trigger the start or end of the exercise

//Main delay function
export function Delai(ms) {
    return new Promise(resolve => {
        let interval = 100;  // we check every 100ms if the user has stopped the exercise
        let tempsEcoulé = 0; // store the time passed

        //verifier() handles the exercise through resolve()
        //if the user has stopped, resolve()
        // if it's time to switch between inhale/exhale, resolve()
        function verifier() {
            if (annulé.stop || tempsEcoulé >= ms) {
                resolve();
            } else {
                tempsEcoulé += interval;
                setTimeout(verifier, interval);
            }
        };
    verifier();
    });
};

//Display 'Inspire' (inhale) then a 4.5sec wait
async function expire(div) {
    div.innerHTML = `<p>Inspire</p>`;
    await Delai(4500);
};

 
//Display 'Expire' (exhale) then a 9.5sec wait
async function inspire(div) {
    div.innerHTML=`<p>Expire</p>`;
    await Delai(9500);
}

export async function boucleCercle(div) {
    annulé.stop = false;
    while (!annulé.stop && div.classList.contains("cercleAnimation")) {
        await expire(div);
        if (annulé.stop) break;
        await inspire(div);
    }
}
