const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
	const pokemon = new Pokemon()
	pokemon.number = pokeDetail.id.toString().padStart(3, '0')
	pokemon.name = pokeDetail.name
	pokemon.id = pokeDetail.id
	pokemon.weight = pokeDetail.weight
	pokemon.height = pokeDetail.height
	pokemon.photo = pokeDetail.sprites.front_default
	
	const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
	const [type] = types
	
	pokemon.types = types
	pokemon.type = type

	const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
	const [ability] = abilities
	
	pokemon.abilities = abilities
	pokemon.ability = ability

	// Gabi que fez
	let stats = [];
	let excludeStats = ['special-attack', 'special-defense'];

	pokeDetail.stats.forEach(elem => {
		let stat = elem.stat.name;
		let value = elem.base_stat;
		if(!excludeStats.includes(stat)) {
			stats.push({stat: stat, value: value})
		}
		//pokemon[stat] = value;
	})

	pokemon.stats = stats;
	console.log(pokemon)

	return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
	return fetch(pokemon.url)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon)
}
	
pokeApi.getPokemons = (offset = 0, limit = 12) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
	
	return fetch(url)
		.then((response) => response.json())
		.then((jsonBody) => jsonBody.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) 
		.then((detailRequests) => Promise.all(detailRequests))
		.then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (pokemonId) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`

	return fetch(url)
		.then((response) => response.json())
		.then(convertPokeApiDetailToPokemon)
}