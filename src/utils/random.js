const numberOfPokemon = 898; // 898 is the number of pokemon there are
export function getRandomPokedexNumber() {
	let number = Math.floor(Math.random() * (numberOfPokemon - 1)) + 1;
	return number; // Math.floor(Math.random() * max) gives a range 0..max and the needed range is 1..max+1
};

export function formatName(name) {
	return (name === "nidoran-f") ? "Nidoran ♀" :
	(name === "nidoran-m") ? "Nidoran ♂" :
	(name === "farfetchd") ? "Farfetch'd":
	(name === "mime-jr") ? "Mime Jr." :
	(name === "porygon-z") ? "Porygon-Z" :
	(name === "flabebe") ? "Flabébé" :
	(name === "tapu-koko") ? "Tapu Koko" :
	(name === "tapu-lele") ? "Tapu Lele" :
	(name === "tapu-bulu") ? "Tapu Bulu" :
	(name === "tapu-fini") ? "Tapu Fini" :
	(name === "type-null") ? "Type: Null" :
	(name === "mr-rime") ? "Mr. Rime" :
	capitalize(name);
};
export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
};