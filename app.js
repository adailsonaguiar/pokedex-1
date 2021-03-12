const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromisses = () =>
  Array(150)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );

const generateHtml = (pokemons) =>
  pokemons.reduce((accumulator, pokemon) => {
    const { name, id, types } = pokemon;
    const typesName = types.map((typeInfo) => typeInfo.type.name);
    accumulator += `
      <li class="card ${typesName[0]}">
          <img loading=lazy 
              class="card-image" 
              alt="${name}" 
              src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"
          />
          <h2 class="card-title">${id}. ${name}</h2>
          <p class="ca    rd-subtitle">${typesName.join(" | ")}</p>
      </li>
      `;
    return accumulator;
  }, "");

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');

  ul.innerHTML = pokemons;
};

const pokemonPromisses = generatePokemonPromisses();

Promise.all(pokemonPromisses).then(generateHtml).then(insertPokemonsIntoPage);
