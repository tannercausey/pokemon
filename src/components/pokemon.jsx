import React, { Component } from "react";
import axios from "axios";

const apiEndpoint = "https://pokeapi.co/api/v2/";
class Pokemon extends Component {
	state = {
		pokemon: {
			number: this.getRandNum(),
			name: "",
			pokedex: "",
			spriteUrl: "",
		},
	};
	async componentDidMount() {
		const { data: pokedexData } = await axios.get(
			apiEndpoint + "pokemon-species/" + this.state.pokemon.number
		);
		const { data: spriteData } = await axios.get(
			apiEndpoint + "pokemon/" + this.state.pokemon.number
		);
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
	handleClick = () => {
		window.location.reload();
		this.setState({ pokemon: { number: this.getRandNum() } });
		console.log(this.state.number);
	};
	getRandNum() {
		var max = 898 - 1; // 898 is the number of pokemon there are
		let number = Math.floor(Math.random() * max) + 1;
		console.log(number);
		return number; // Math.floor(Math.random() * max) gives a range 0-max and the needed range is 1-max+1
	}

	capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	render() {
		const { pokemon } = this.state;
		return (
			<div>
				<div>
					<button onClick={this.handleClick}>Get Random Pokemon</button>
					<h1>{this.state.number}</h1>
				</div>
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
