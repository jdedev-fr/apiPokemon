const urlBase = 'https://pokeapi.co/api/v2/'

$("#menu>*").click((event) => {
    //console.log(event.target.id)
    let ressource = ""
    switch (event.target.id) {
        case "berry":
            ressource = "berry"
            break
        case "contest":
            ressource = "contest-type"
            break
        case "encounter":
            ressource = "encounter-method"
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
    reqListe(urlBase + ressource, event.target.id)

})

function reqListe(url, type) {
    console.log(type)
    $.get(url, (data) => {
        let monUrl = new URL(url)
        let monOffSet = monUrl.searchParams.get('offset') || 0
        console.log(monOffSet)
        //  $("#liste").html("on a fait une requete ajax : ")
        let htmlTemp = ""
        for (let i in data.results) {
            htmlTemp += '<div class="ligne" id="listeLig' + i + '" data-url="' + data.results[i].url + '"><div>' + (+monOffSet + (+i) + 1) + '</div><div>' + (data.results[i].name || (+i + 1)) + "</div></div>"
        }
        htmlTemp += '<div class="ligne2">'
        if (data.previous) {
            htmlTemp += '<div id="btnPrev"><-</div>'
        }
        else {
            htmlTemp += "<div></div>"
        }
        if (data.next) {
            htmlTemp += '<div id="btnSuiv">-></div>'
        }
        else {
            htmlTemp += "<div></div>"
        }
        htmlTemp += "</div>"
        $("#liste").html(htmlTemp)
        $(".ligne").click((event) => {
            reqDetail(event, type)
        })
        $("#btnSuiv").click(() => {
            let monUrl = new URL(data.next)
            monUrl.searchParams.set('limit', 20)
            reqListe(monUrl, type)
        })
        $("#btnPrev").click(() => {
            let monUrl = new URL(data.previous)
            monUrl.searchParams.set('limit', 20)
            reqListe(monUrl, type)
        })
    })
}

function reqDetail(event, type) {
    console.log(event.target.dataset.url, type)
}