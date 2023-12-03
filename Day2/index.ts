import { readFile } from '../read';

const example: Array<string> = readFile('Day2/example.txt');
const input: Array<string> = readFile('Day2/input.txt');

let startTime: number = 0;
let endTime: number = 0;

const diceStartAmount: { [key: string]: number } = {
	red: 12,
	blue: 14,
	green: 13,
};

const seperateGameTurns = (game: string): Array<string> => {
	let [gameId, gameTurns] = [...game.split(':')];
	gameId = gameId.split(' ')[1];

	return [gameId, gameTurns];
};

const checkGameValidity = (turns: string): boolean => {
	let gameValidities: Array<boolean> = [];
	turns.split(';').forEach((turn) => {
		let diceGroup: Array<string> = turn.split(',');
		diceGroup.forEach((group) => {
			const [amount, color] = group
				.trim()
				.split(' ')
				.filter((x) => x !== '');

			if (parseInt(amount) > diceStartAmount[color]) {
				gameValidities.push(false);
			} else {
				gameValidities.push(true);
			}
		});
	});
	return gameValidities.reduce((a, b) => a && b, true);
};

const part1 = (input: Array<string>) => {
	let validGames: Array<number> = [];
	input.forEach((line) => {
		const [gameId, gameTurns] = seperateGameTurns(line);
		const gameIdInt: number = parseInt(gameId);
		const gameTurnsArray: Array<string> = gameTurns.split(';');
		// console.log(gameTurnsArray);

		if (checkGameValidity(gameTurns)) {
			validGames.push(gameIdInt);
		}
	});
	console.log(
		'Part 1: ',
		validGames.reduce((a, b) => a + b),
	);
};

console.time('part1');
part1(input);
console.timeEnd('part1');

let diceAmount: { [key: string]: number } = {
	red: 1,
	blue: 1,
	green: 1,
};

const findMinimalAmounts = (turns: string): number => {
	Object.keys(diceAmount).forEach((color) => (diceAmount[color] = 1));
	turns.split(';').forEach((turn) => {
		turn.split(',').forEach((grab) => {
			const [amount, color] = grab.trim().split(' ');
			if (diceAmount[color] === 1) {
				diceAmount[color] = parseInt(amount);
			} else {
				if (parseInt(amount) > diceAmount[color]) {
					diceAmount[color] = parseInt(amount);
				}
			}
		});
	});
	return diceAmount['red'] * diceAmount['blue'] * diceAmount['green'];
};
const part2 = (input: Array<string>) => {
	let diceProducts: Array<number> = [];
	input.forEach((line) => {
		diceProducts.push(findMinimalAmounts(seperateGameTurns(line)[1]));
	});
	console.log(
		'Part 2: ',
		diceProducts.reduce((a, b) => a + b),
	);
};

console.time('part2');
part2(input);
console.timeEnd('part2');
