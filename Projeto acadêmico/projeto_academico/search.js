const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonDescription = document.querySelector('.pokemon__description');
let pokemonData;

const fetchPokemon = async (pokemonNameOrId) => {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId.toLowerCase()}`)
     .then
     (async (response) => {
       if (response.status === 200) {
         const data = await response.json();
         pokemonData = data;
       } else {
         return null;
       }
     });

  } catch (error) {
    console.error('Erro ao buscar informações do Pokémon:', error);
    return null;
  }
}

const displayPokemon = async (pokemonData) => {
  const description = await fetchPokemonDescription(pokemonData.id);

  pokemonName.innerHTML = pokemonData.name;
  pokemonImage.style.display = 'block';
  pokemonImage.src = pokemonData.sprites.front_default;
  pokemonDescription.innerHTML = description;
}

const fetchPokemonDescription = async (pokemonId) => {
  try {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      const description = data.flavor_text_entries.find((entry) => entry.language.name === 'en');
      return description ? description.flavor_text : 'Descrição não encontrada.';
    } else {
      return 'Descrição não encontrada.';
    }
  } catch (error) {
    console.error('Erro ao buscar a descrição do Pokémon:', error);
    return 'Descrição não encontrada.';
  }
}

searchButton.addEventListener('click', async function () {
  const searchTerm = searchInput.value;

  console.log('passando aqui', searchInput.value)

  if (searchTerm) {
    await fetchPokemon(searchTerm);
    console.log('response: ', pokemonData);
    
    if (pokemonData) {
      displayPokemon(pokemonData);
    } else {
      pokemonName.innerHTML = 'Não encontrado :c';
      pokemonImage.style.display = 'none';
      pokemonDescription.innerHTML = '';
    }
  }
});
