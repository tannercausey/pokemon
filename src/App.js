import React, { Component } from "react";
//import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import Pokemon from "./components/pokemon";
import "./App.css";
import Card from "./components/card";

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<main className="container">
					<Pokemon />
				</main>
			</React.Fragment>
		);
	}
}

export default App;
