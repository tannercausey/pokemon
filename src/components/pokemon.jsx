import React, { Component } from "react";
import axios from "axios";
import { getRandomPokedexNumber } from "../utils/random";

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			number: 0, //1,
			name: "", // "Bulbasaur",
			pokedex: "", // "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
			spriteUrl: "", //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
		},
	};
	getPokemon = async () => {
		const number = getRandomPokedexNumber();
		let { data: allpokemons } = await axios.get(apiEndpoint + "pokemon?limit=1118");
		allpokemons = allpokemons.results;
		for (let pokemon of allpokemons) {
			console.log(pokemon.name);
		}
		const { data: pokedexData } = await axios.get(apiEndpoint + "pokemon-species/" + number);
		const pokedexEntry = this.getENdexEntry(pokedexData);
		const { data: spriteData } = await axios.get(apiEndpoint + "pokemon/" + number);
		const name = this.capitalize(pokedexData.name);
		/* switch (name) {
			case "nidoran-f":
				name = "Nidoran ♀";
				break;
			case "nidoran-m":
				name = "Nidoran ♂";
			case "mime-jr":
			case "porygon-z":
			case "type-null":
			case "jangmo-o":
			case "hakamo-o":
			case "kommo-o":
			case "tapu-koko":
			case "tapu-lele":
			case "tapu-bulu":
			case "tapu-fini":
			case "mr-rime":
			
		} */
		const pokemon = {
			number: number,
			name: name,
			pokedex: pokedexEntry.replaceAll("\n", " ").replaceAll("\f", " "),
			spriteUrl: spriteData.sprites.other["official-artwork"].front_default,
		};
		return pokemon;
	};
	getENdexEntry(pokedexData) {
		console.log(pokedexData);
		for (let i = 0; i < pokedexData.flavor_text_entries.length; i++) {
			if (pokedexData.flavor_text_entries[i].language.name === "en") {
				return pokedexData.flavor_text_entries[i].flavor_text;
			}
		}
	}
	async componentDidMount() {
		await this.handleNewPokemonClick();
	}
	handleNewPokemonClick = async () => {
		const pokemon = await this.getPokemon();
		this.setState({ pokemon });
	};
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	render() {
		const { name, number, pokedex, spriteUrl } = this.state.pokemon;
		return (
			<div>
				<button onClick={this.handleNewPokemonClick} className="btn btn-primary">
					Get Random Pokemon
				</button>
				<div className="card" style={{ width: 18 + "rem" }}>
					<img className="card-img-top" src={spriteUrl} alt="sprite" />
					<div className="card-body">
						<h5 className="card-title">{name}</h5>
						{<p className="card-text">{pokedex}</p>}
					</div>
				</div>
			</div>
		);
	}
}

export default Pokemon;
