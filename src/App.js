import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import logo from "./logo.svg";
import NavBar from "./components/navbar";
import "./App.css";
import Card from "./components/card";
import RanButton from "./components/ranButton";

class App extends Component {
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
}

export default App;
