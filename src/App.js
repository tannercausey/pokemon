import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import "./App.css";
import Card from "./components/card";
import RanButton from "./components/ranButton";

class App extends Component {
<<<<<<< HEAD
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RanButton />
          <Card />
          {/* <img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer">
						Learn React
					</a> */}
        </header>
      </div>
    );
  }
=======
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main class="container">
					<Routes>
						<Route path="/pokemon" component={Pokemon} />
					</Routes>
					<Card />
				</main>
			</React.Fragment>
		);
	}
>>>>>>> 05b92721aa751c76732ecc2daf41247b8161bfcd
}

export default App;
