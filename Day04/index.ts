import { readFile } from '../read';

const example = readFile('./Day04/example.txt');
const input = readFile('./Day04/input.txt');

const seperateNumbers = (card: string): string[] => {
	const [numbers, winningNumbers] = card.split(':')[1].split('|');

	return [numbers.trim(), winningNumbers.trim()];
};
const calculatewinners = (card: string[]): number => {
	const [numbers, winningNumbers] = card;
	let winners = 0;
	numbers.split(' ').forEach((number) => {
		if (
			number !== '' &&
			winningNumbers.match(new RegExp(`\\b${number}\\b`, 'gi'))
		) {
			if (winners === 0) {
				winners += 1;
			} else {
				winners *= 2;
			}
		}
	});
	return winners;
};
const part1 = (input: string[]) => {
	let winners: number[] = [];
	let cards: string[][] = [];
	input.forEach((card) => {
		cards.push(seperateNumbers(card));
	});

	cards.forEach((card) => {
		winners.push(calculatewinners(card));
	});
	console.log(
		'Part 1: ',
		winners.reduce((a, b) => a + b, 0),
	);
};

console.time('Part 1');
part1(input);
console.timeEnd('Part 1');

const amountOfWinningNumbers = (card: string[]): number => {
	const [numbers, winningNumbers] = card;
	let winners = 0;
	numbers.split(' ').forEach((number) => {
		if (
			number !== '' &&
			winningNumbers.match(new RegExp(`\\b${number}\\b`, 'gi'))
		) {
			winners += 1;
		}
	});
	return winners;
};

const part2 = (input: string[]) => {
	let winners: number[] = [];
	let cards: string[][] = [];
	let totalCards: number[] = Array.from({ length: input.length }, () => 1);

	input.forEach((card) => {
		cards.push(seperateNumbers(card));
	});

	cards.forEach((card) => {
		winners.push(amountOfWinningNumbers(card));
	});

	for (let i = 0; i < input.length; i++) {
		for (let j = 1; j <= winners[i]; j++) {
			if (i + j >= input.length) {
				totalCards[input.length - 1] += totalCards[i];
			} else {
				totalCards[i + j] += totalCards[i];
			}
		}
	}
	console.log(
		'Part 2: ',
		totalCards.reduce((a, b) => a + b),
	);
};

console.time('Part 2');
part2(input);
console.timeEnd('Part 2');
