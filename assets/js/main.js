const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0;

function loadPokemonItems(offset, limit) {
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		const newHtml = pokemons.map((pokemon) => `
			<li class="pokemon ${pokemon.type}">
 				<button class="modal-button" type="button">
	  				<div class="number">
						<span>#${pokemon.number}</span>
	  				</div>

	 				<div class="name">
	 					<span>${pokemon.name}</span>
	   				</div>
					
					<div class="detail">
						<ol class="types">
							${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
						</ol>
						
						<img src="${pokemon.photo}" alt="${pokemon.name}">
					</div>
	 			</button>
			</li>
		`).join('')
		pokemonList.innerHTML += newHtml
	})
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
	offset += limit

	const qtdRecordsNextPage = offset + limit
	
	if (qtdRecordsNextPage >= maxRecords) {
		const newLimit = maxRecords - offset
		loadPokemonItems(offset, newLimit)
		
		loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
		loadPokemonItems(offset, limit)
	}
})