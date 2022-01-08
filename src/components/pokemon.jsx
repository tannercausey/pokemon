import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			name: "",
			pokedex: "",
			spriteUrl: "",
		},
	};
	async componentDidMount() {
		const { data: pokedexData } = await axios.get(apiEndpoint + "pokemon-species/1/");
		const { data: spriteData } = await axios.get(apiEndpoint + "pokemon/1/");
		console.log(spriteData.sprites);
		const name = this.capitalize(pokedexData.name);
		const pokemon = {
			pokemon: {
				name: name,
				pokedex: pokedexData.flavor_text_entries[0].flavor_text
					.replaceAll("\n", " ")
					.replaceAll("\f", " "),
				spriteUrl: spriteData.sprites.other["official-artwork"].front_default,
			},
		};
		console.log(pokemon);
		this.setState(pokemon);
	}
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	render() {
		const { pokemon } = this.state;
		return (
			<div>
				<div className="card" style={{ width: 18 + "rem" }}>
					<img className="card-img-top" src={pokemon.spriteUrl} alt="sprite" />
					<div className="card-body">
						<h5 className="card-title">{pokemon.name}</h5>
						<p className="card-text">{pokemon.pokedex}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Pokemon;
