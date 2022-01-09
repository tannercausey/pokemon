const numberOfPokemon = 898; // 898 is the number of pokemon there are
export function getRandomPokedexNumber() {
	let number = Math.floor(Math.random() * (numberOfPokemon - 1)) + 1;
	//console.log(number);
	return number; // Math.floor(Math.random() * max) gives a range 0..max and the needed range is 1..max+1
}
