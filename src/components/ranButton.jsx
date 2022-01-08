import React, { Component } from "react";

class RanButton extends Component {
	state = {
		number: 0,
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
