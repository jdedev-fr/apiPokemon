
/**
 * url de base de mon api
 */
const urlBase = 'https://pokeapi.co/api/v2/'

$("#menu>*").click((event) => {
    //console.log(event.target.id)
    let ressource = ""
    //Permet de faire le lien entre l'id du boutton et la ressource de l'api
    switch (event.target.id) {
        case "berry":
            ressource = "berry"
            break
        case "contest":
            ressource = "contest-type"
            break
        case "encounter":
            ressource = "encounter-condition"
            break
        case "evolution":
            ressource = "evolution-chain"
            break
        case "games":
            ressource = "generation"
            break
        case "items":
            ressource = "item"
            break
        case "location":
            ressource = "location"
            break
        case "machines":
            ressource = "machine"
            break
        case "moves":
            ressource = "move"
            break
        case "pokemon":
            ressource = "ability"
            break
        default:
            ressource = ""
            break
    }
    //appelle la fonction qui va faire la requete ajax et mettre en forme
    reqListe(urlBase + ressource, event.target.id)
})

/**
 * Fonction qui fait une requete ajax et doit recuperer une liste d'element d'une ressource de l'api la fonction mets également en forme le retour (DOM)
 * @param {String} url - url à appeler en ajax 
 * @param {String} type - id du bouton sur lequel on a cliqué 
 */
function reqListe(url, type) {
    //console.log(type)
    /**
     * $.get fait une requete ajax de type GET sur l'url donné et récupère les données envoyés par le serveur dans data
     */
    $.get(url, (data) => {

        //On souhaite conserver l'id donc on doit prendre en compte l'offset sur le competeur de lignes
        let monUrl = new URL(url)
        let monOffSet = monUrl.searchParams.get('offset') || 0
        //console.log(monOffSet)

        /**
         * Dans htmlTemp on prépare l'affichage pour le transferer au document
         */
        let htmlTemp = ""

        /**
         * On parcours le tableau de resultat de l'api
         */
        for (let i in data.results) {
            /**
             * On ajoute une div en html qui contient l'url de détail, le numéro de ligne et le nom
             * Le || en JS permet de remplacer la première valeur par la deuxième si la première valeur est nulle ou indefinie
             * (+i+1) est l'indice de la case dans le tableau
             */
            htmlTemp += '<div class="ligne" id="listeLig' + i + '" data-url="' + data.results[i].url + '"><div>' + (+monOffSet + (+i) + 1) + '</div><div>' + (data.results[i].name || (+i + 1)) + "</div></div>"
        }
        /**
         * On prépare une ligne avec les bouttons next et prev
         */
        htmlTemp += '<div class="ligne2">'
        /**
         * On regarde si previous contient quelque chose
         */
        if (data.previous) {
            htmlTemp += '<div id="btnPrev"><-</div>'
        }
        else {
            htmlTemp += "<div></div>"
        }
        /**
         * On regarde si next contient quelque chose
         */
        if (data.next) {
            htmlTemp += '<div id="btnSuiv">-></div>'
        }
        else {
            htmlTemp += "<div></div>"
        }
        htmlTemp += "</div>"

        /**
         * On gère le rendu, on affiche la variable htmlTemp dans la div liste
         */
        $("#liste").html(htmlTemp)
        /**
         * On gère les clic sur les lignes et les boutons prev et next
         */
        $(".ligne").click((event) => {
            /**
             * Au clic sur une ligne on veut afficher le détail d'une ressource
             */
            reqDetail(event, type)
        })
        $("#btnSuiv").click(() => {
            /**
             * Sur l'api pokemon le backend change de temps à autre la limite pour renvoyer moins de 20 lignes, on force donc la limite à 20 à chaque fois
             */
            let monUrl = new URL(data.next)
            monUrl.searchParams.set('limit', 20)
            /**
             * Le bouton suivant rappelle la fonction reqListe pour modifier la liste affichée
             */
            reqListe(monUrl, type)
        })
        $("#btnPrev").click(() => {
            let monUrl = new URL(data.previous)
            monUrl.searchParams.set('limit', 20)
            reqListe(monUrl, type)
        })
    })
}

/**
 * fonction qui fera le tri entre les type pour appeller la bonne fonction de détail
 * @param {Event} event - evenement Click qui permet d'identifier l'element html sur lequel l'utilisateur à cliqué 
 * @param {String} type - id du bouton sur lequel on a cliqué (Menu)
 */
function reqDetail(event, type) {
    let monUrl = event.target.dataset.url || event.target.parentElement.dataset.url
    // console.log(event.target.dataset.url || event.target.parentElement.dataset.url, type)
    /**
     * Switch pour testser le type d'affichage détaillé
     */
    switch (type) {
        case "berry":
            reqDetailBerry(monUrl)
            break
        default:
            /**
             * default si aucun case ne correspond dans le switch
             */
            console.log(type)
            $("#detail").html("Fonction inconnue :" + type)
            break;

    }
    /*
    
    --------------- Equivalent du switch en if else if else -------------------
        if (type === "berry") {
            reqDetailBerry(monUrl)
        }
        else if (type === "contest") {
            reqDetailContest(monUrl)
        }
        else {
            console.log(type)
            $("#detail").html("Fonction inconnue :" + type)
            break;
        }
    */
}

/**
 * Fonction qui mets en forme la fiche détaillée d'une berry
 * @param {String} url - url de la fiche détaillé de la berry sur l'api 
 */
function reqDetailBerry(url) {
    $.get(url, (data) => {
        console.log(data)
        let texteTmp = ""
        texteTmp += '<div class="ligne2"><div>name :</div><div>' + data.name + "</div></div>"
        texteTmp += '<div class="ligne2"><div>size :</div><div>' + data.size + "</div></div>"
        texteTmp += '<br>'
        texteTmp += '<div class="ligne2"><div>firmness :</div><div>' + data.firmness.name + "</div></div>"
        /**
         * flavor est un tableau donc on fait une boucle for
         */
        for (let i in data.flavors) {
            texteTmp += '<div class="ligne2"><div>flavor :</div><div>' + data.flavors[i].flavor.name + '/' + data.flavors[i].potency + "</div></div>"

        }
        texteTmp += '<br>'
        texteTmp += '<div class="ligne2"><div>item :</div><div>' + data.item.name + "</div></div>"
        texteTmp += '<div class="ligne2"><div>max harvest :</div><div>' + data.max_harvest + "</div></div>"
        texteTmp += '<div class="ligne2"><div>natural gift power :</div><div>' + data.natural_gift_power + "</div></div>"
        texteTmp += '<div class="ligne2"><div>growth time :</div><div>' + data.growth_time + "</div></div>"

        /**
         * On charge le texte HTML dans la balise détail
         */
        $("#detail").html(texteTmp)
    })

}
