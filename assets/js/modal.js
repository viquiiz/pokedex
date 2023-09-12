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
			<div class="modal-types">
			<ol class="modal-pokemon-types">
				${pokemon.types.map((type) => `<li class="modal-pokemon-type ${type}">${type}</li>`).join('')}
			</ol>
			</div>
   			<div class="modal-img">
	  			<img src="${pokemon.photo}" alt="${pokemon.name}">
	  		</div>
	 		<div class="modal-poke-stats ${pokemon.type}">
				<ol class="modal-pokemon-stats">
					${pokemon.stats.map((elem) => `<li class="stats-li">
						<p>${elem.stat}: ${elem.value}</p>
						<div class="stats-bar ${pokemon.type}">
							<div style="width: ${elem.value}%"></div>
						</div>
					</li>`).join('')}
				</ol>
			</div>
	 	`
		modalContent.innerHTML = pokemonInfo
	})
}