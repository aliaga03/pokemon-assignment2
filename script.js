const btn = document.getElementById("pok-button");

btn.addEventListener("click", function() {
    displayPokemon();
})

async function getPokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
        method: "GET",
    });

    const json = await response.json();
    return json;
}

async function displayPokemon() {
    const data = await getPokemon();
    let url = data.results.map(a => a.url);

    let elements = ""
    for (let i = 0; i < url.length; i++) {
        const response = await fetch(url[i], {
            method: "GET",
        });
        const pokemon = await response.json();

        let element = `\
        <div class="card" id="${pokemon.types[0].type.name}">\
            <span>${pokemon.id}: </span>\
            <span>${pokemon.name}</span>\
            <div>\
                <img src="${pokemon.sprites.front_shiny}">\
            </div>\
            <span>type: ${pokemon.types[0].type.name}</span>\
        </div>\
        `;
        elements += element
    }
    document.getElementById("pokemon-list").innerHTML = elements;
}
