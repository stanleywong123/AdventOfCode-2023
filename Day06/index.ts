import { readFile, readFilePure } from '../read';

const example = readFile('./Day06/example.txt');
const input = readFile('./Day06/input.txt');

const findWinningOutcomes = (time: number, record: number): number => {
	let winners: number = 0;
	for (let i = 0; i <= time; i++) {
		let distance: number = i * (time - i);
		if (distance > record) {
			winners += 1;
		}
	}
	return winners;
};
const part1 = (input: string[]) => {
	let [time, distance] = input;

	let times = time.split(':')[1].match(/\d+/g);
	let timesInt: number[] = [];
	times?.forEach((time) => timesInt.push(parseInt(time)));

	let distances = distance.split(':')[1].match(/\d+/g);
	let distancesInt: number[] = [];
	distances?.forEach((distance) => distancesInt.push(parseInt(distance)));

	let winningOutcomes: number[] = [];

	for (let i = 0; i < timesInt?.length; i++) {
		winningOutcomes.push(findWinningOutcomes(timesInt[i], distancesInt[i]));
	}

	console.log(
		'Part 1: ',
		winningOutcomes.reduce((a, b) => a * b),
	);
};

console.time('Part 1');
part1(input);
console.timeEnd('Part 1');

const part2 = (input: string[]) => {
	let [time, distance] = input;

	let times = time.split(':')[1].match(/\d+/g);
	let timesTotal: string = '';
	times?.forEach((time) => {
		timesTotal += time;
	});

	let distances = distance.split(':')[1].match(/\d+/g);
	let distancesTotal: string = '';
	distances?.forEach((distance) => {
		distancesTotal += distance;
	});

	console.log(
		'Part 2: ',
		findWinningOutcomes(parseInt(timesTotal), parseInt(distancesTotal)),
	);
};

console.time('Part 2');
part2(input);
console.timeEnd('Part 2');
