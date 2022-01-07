import React, { Component } from "react";
//import { Route, Routes } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import "./App.css";
import Card from "./components/card";

const apiEndpoint = "https://pokeapi.co/api/v2/";

class App extends Component {
	state = {
		bulbasaur: {},
	};
	async componentDidMount() {
		const { data: bulbasaur } = await axios.get(apiEndpoint + "pokemon-species/1/");
		console.log(bulbasaur);
		this.setState(bulbasaur);
	}

	render() {
		return (
			<React.Fragment>
				<main class="container">
					<p>{this.state.bulbasaur}</p>
					<Card />
				</main>
			</React.Fragment>
		);
	}
}

export default App;
