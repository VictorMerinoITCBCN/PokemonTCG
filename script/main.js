const getRandomIds = async (page_amout) => {
    const ids = []

    for (let page = 0;page < page_amout;page++) {
        const res = await fetch("https://api.pokemontcg.io/v2/cards?p="+ Math.floor(Math.random() * 74000))
        const cards = await res.json()
        const pageIds = cards.data.map(card => card.id)
        ids.push(...pageIds)
    }
    return ids
}

const getRandomCards = async ({ids, amout = 5}) => {
    const randomIds = ids.sort(() => Math.random() - .5).slice(0, amout)

    const cards = []

    for (const id of randomIds) {
        const res = await fetch("https://api.pokemontcg.io/v2/cards/" + id)
        const card = await res.json()
        cards.push(card.data)
    }

    return cards
}

const createCard = (data) => {
    const $card = document.createElement("div")
    $card.className = "card"
    const $img = document.createElement("img")
    $img.src = data.images.large
    $card.appendChild($img)

    const cardContainer = document.getElementById("card-container")

    $card.addEventListener("click", () => {
        $card.classList.add("next")
        setTimeout(() => cardContainer.removeChild($card), 1000)
        
    })

    cardContainer.appendChild($card)
}

const openPack = async () => {
    const cards = await getRandomCards({ids})
    cards.forEach(card => createCard(card))
}

const $openPackBtn = document.getElementById("btn-open-pack")
let ids
document.addEventListener("DOMContentLoaded", async () => {
    $openPackBtn.disabled = true
    ids = await getRandomIds(1)
    $openPackBtn.disabled = false
    console.log("Loaded")
})

$openPackBtn.addEventListener("click", () => {
    openPack()
})