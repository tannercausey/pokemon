import React, { Component } from "react";
import axios from "axios";
import { getRandomPokedexNumber, formatName, capitalize } from "../utils/random";
import '../css/pokemon.css';

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			number: 0, //1,
			types: [],
			name: "", // "Bulbasaur",
			pokedex: "", // "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.",
			spriteUrl: "", //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
		},
	};
	getPokemon = async () => {
		const number = getRandomPokedexNumber();
		const { data: pokemonData } = await axios.get(apiEndpoint + "pokemon/" + number);
		const { data: otherData } = await axios.get(apiEndpoint + "pokemon-species/" + number);
		const pokedexEntry = this.getENdexEntry(otherData);
		const types = [];
		pokemonData.types.forEach(type=> types.push(type));
		const pokemon = {
			number: number,
			types: types,
			name: formatName(otherData.name),
			pokedex: pokedexEntry.replaceAll("\n", " ").replaceAll("\f", " "),
			spriteUrl: pokemonData.sprites.other["official-artwork"].front_default,
		};
		return pokemon;
	};
	getENdexEntry(otherData) {
		for (let i = 0; i < otherData.flavor_text_entries.length; i++)
			if (otherData.flavor_text_entries[i].language.name === "en")
				return otherData.flavor_text_entries[i].flavor_text;
	}
	async componentDidMount() {
		await this.handleNewPokemonClick();
	}
	handleNewPokemonClick = async () => {
		const pokemon = await this.getPokemon();
		this.setState({ pokemon });
	};
	render() {
		const { name, number, types, pokedex, spriteUrl } = this.state.pokemon;
		return (
			<React.Fragment>
				<div style = {{display: "flex", justifyContent: "center"}}>
					<button onClick={this.handleNewPokemonClick} className="btn btn-primary" style = {{marginBottom: ".5cm"}}>
						Get Random Pokémon
					</button>
				</div>
				<h4 style = {{display: "flex", justifyContent: "center"}}>
					{number <= 9 ? "00" + number :
					number <= 99 ? "0" + number :
					number}
				</h4>
				<div style = {{display: "flex", justifyContent: "center"}}>
					<div className="card" style={{ width: 24 + "rem" }}><br/>
						<h3 className="card-title text-center" styel = {{marginTop: ".5cm"}}>{name}</h3>
						<img className="card-img-top" src={spriteUrl} alt="sprite" />
						<div className="card-body text-center">
							<p className="align-center" style = {{display: "flex", justifyContent: "center"}}>
							{types.map(type =>
								<span pill={type.type.name} key={type.slot}>
									{capitalize(type.type.name)}
								</span>)
							}</p>
							<p className="card-text">{pokedex}</p>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Pokemon;
