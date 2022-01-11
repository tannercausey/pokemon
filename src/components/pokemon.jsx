import React, { Component } from "react";
import axios from "axios";
import { getRandomPokedexNumber } from "../utils/random";

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			number: 0, //1,
			type: [],
			name: "", // "Bulbasaur",
			pokedex: "", // "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
			spriteUrl: "", //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
		},
	};
	getPokemon = async () => {
		const number = getRandomPokedexNumber();
		const { data: pokedexData } = await axios.get(apiEndpoint + "pokemon-species/" + number);
		const pokedexEntry = this.getENdexEntry(pokedexData);
		const { data: spriteData } = await axios.get(apiEndpoint + "pokemon/" + number);
		const pokemon = {
			number: number,
			name: this.formatName(pokedexData.name),
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
	formatName(name) {
		return (name === "nidoran-f") ? "Nidoran ♀" :
		(name === "nidoran-m") ? "Nidoran ♂" :
		(name === "farfetchd") ? "Farfetch'd":
		(name === "mime-jr") ? "Mime Jr." :
		(name === "porygon-z") ? "Porygon-Z" :
		(name === "flabebe") ? "Flabébé" :
		(name === "tapu-koko") ? "Tapu Koko" :
		(name === "tapu-lele") ? "Tapu Lele" :
		(name === "tapu-bulu") ? "Tapu Bulu" :
		(name === "tapu-fini") ? "Tapu Fini" :
		(name === "type-null") ? "Type: Null" :
		(name === "mr-rime") ? "Mr. Rime" :
		name.charAt(0).toUpperCase() + name.slice(1);
	}
	render() {
		const { name, number, pokedex, spriteUrl } = this.state.pokemon;
		return (
			<div>
				<button onClick={this.handleNewPokemonClick} className="btn btn-primary">
					Get Random Pokemon
				</button>
				<div className="card" style={{ width: 28 + "rem" }}>
					<img className="card-img-top" src={spriteUrl} alt="sprite" />
					<div className="card-body">
						<h5 className="card-title">{name}</h5>{}
						{<p className="card-text">{pokedex}</p>}
					</div>
				</div>
			</div>
		);
	}
}

export default Pokemon;
