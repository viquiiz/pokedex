function convertPokemonToLi(pokemon) {
	return `
		<li class="pokemon">
			<span class="number">#${pokemon.number}</span>
			<span class="name">${pokemon.name}</span>

			<div class="detail">
				<ol class="types">
					${pokemon.types.map((type) => `<li class="type">${type}</li>`)}
				</ol>

				<img src="${pokemon.photo}" alt="${pokemon.name}">
			</div>
		</li> 
	 `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => {
	const newHtml = pokemons.map(convertPokemonToLi).join('')
	pokemonList.innerHTML += newHtml
})