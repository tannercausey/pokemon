import React, { Component } from "react";
import axios from "axios";
import { getRandomPokedexNumber } from "../utils/random";

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			number: 1,
			name: "Bulbasaur",
			pokedex: "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
			spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
		},
	};
	getPokemon = async () => {
		const number = getRandomPokedexNumber();
		const { data: pokedexData } = await axios.get(apiEndpoint + "pokemon-species/" + number);
		const { data: spriteData } = await axios.get(apiEndpoint + "pokemon/" + number);
		/* 
		const data = await axios.get(apiEndpoint);
		console.log("data: ", data); */
		//console.log(pokedexData, spriteData);
		const name = this.capitalize(pokedexData.name);
		const pokemon = {
			pokemon: {
				number: number,
				name: name,
				pokedex: pokedexData.flavor_text_entries[0].flavor_text
					.replaceAll("\n", " ")
					.replaceAll("\f", " "),
				spriteUrl: spriteData.sprites.other["official-artwork"].front_default,
			},
		};
		//console.log(pokemon);
		return pokemon;
	};
	async componentDidMount() {
		await this.handleNewPokemonClick();
	}
	handleNewPokemonClick = async () => {
		const pokemon = await this.getPokemon();
		console.log(pokemon);
		this.setState({ pokemon });
	};
	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	render() {
		const { name, number, pokedex, spriteUrl } = this.state;
		console.log(
			"pokemon from state: ",
			name,
			number,
			pokedex,
			spriteUrl
		);
		console.log("state", this.state.pokemon);
		if (this.state.pokemon.pokemon) {console.log(this.state.pokemon.name)}
		return (
			<div>
				<button onClick={this.handleNewPokemonClick} className="btn btn-primary">
					Get Random Pokemon
				</button>
				<div className="card" style={{ width: 18 + "rem" }}>
					<img
						className="card-img-top"
						src=/* {this.state.pokemon.pokemon.spriteUrl} */""
						alt="sprite"
					/>
					<div className="card-body">
						<h5 className="card-title">{this.state.pokemon.name ? this.state.pokemon.name :""}</h5>
						{/* <p className="card-text">{pokemon.pokedex}</p> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Pokemon;
