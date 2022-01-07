import React, { Component } from "react";

var min = 1;
var max = 100;

class RanButton extends Component {
  state = {
    number: 0,
  };

  handleClick = () => {
    var rand = min + Math.random() * (max - min);

    this.setState({ number: Math.round(this.state.number + rand) });
    console.log(this.state.number);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Get Random Pokemon</button>
        <h1>{this.state.number}</h1>
      </div>
    );
  }
}

export default RanButton;