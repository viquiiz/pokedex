const modal = document.getElementById("pokemon-modal");
const modalContent = document.getElementById("pokemon-info")

function closeModal() {
	modal.style.display = "none";
}

function loadModalInfo(pokemonId) {
	modal.style.display = "flex";
	pokemonInfo = pokeApi.getPokemon(pokemonId).then((pokemon) => {
		const pokemonInfo = `
	 		<button class="close-modal" onclick="closeModal()">X</button>
			<div class="modal-title"> 
   				<span class="modal-pokemon-name">${pokemon.name}</span>
				<span class="modal-pokemon-number">#${pokemon.number}</span>
			</div>
   			<div class="modal-img">
	  			<img src="${pokemon.photo}" alt="${pokemon.name}">
	  		</div>
	 		<div class="modal-types">
				<ol class="modal-pokemon-types">
					${pokemon.types.map((type) => `<li class="modal-pokemon-type ${type}">${type}</li>`).join('')}
				</ol>
			</div>
	 		<div class="modal-poke-stats">
				<span>Height: ${pokemon.height}</span>
				<span>Weight: ${pokemon.weight}</span>
				<span>Hp: HP AQUI</span>
				<span>Attack: atk aqui</span>
				<span>Defense: def aqui</span>
				<span>Speed: speed aqui</span>
			</div>
	 	`
		modalContent.innerHTML = pokemonInfo
	})
}