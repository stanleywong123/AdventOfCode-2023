import { textSpanOverlap } from 'typescript';
import { readFile } from '../read';
const input: Array<string> = readFile('Day1/input.txt');
const example: Array<string> = readFile('Day1/example.txt');
const example2: Array<string> = readFile('Day1/example2.txt');
let buffer: Array<number> = [];

const numberMapping: { [key: string]: string } = {
	one: 'o1e',
	two: 't2o',
	three: 't3e',
	four: '4',
	five: '5e',
	six: '6',
	seven: '7n',
	eight: 'e8t',
	nine: 'n9e',
};
const findDigits = (textToCheck: string): string => {
	return textToCheck
		.split('')
		.filter((x) => {
			if (Number.isInteger(parseInt(x))) {
				return x;
			}
		})
		.toString();
};
const textToNumber = (textToCheck: string): string => {
	let skipped: boolean = false;

	while (!skipped) {
		Object.keys(numberMapping).forEach((x) => {
			if (textToCheck.startsWith(x)) {
				textToCheck = textToCheck.replace(new RegExp(x, 'g'), numberMapping[x]);
				skipped = true;
			}
			if (Number.isInteger(parseInt(textToCheck.substring(0)))) {
				skipped = true;
			}
		});
		if (!skipped) {
			textToCheck = textToCheck.substring(1, textToCheck.length);
		}
	}
	Object.keys(numberMapping).forEach((x) => {
		textToCheck = textToCheck.replace(new RegExp(x, 'g'), numberMapping[x]);
	});
	return textToCheck;
};
const part1 = (input: Array<string>) => {
	input.forEach((line) => {
		line = findDigits(line);
		const test: Array<string> = line.split(',');
		switch (test.length) {
			case 0:
				break;
			default:
				buffer.push(parseInt(`${test[0]}${test[test.length - 1]}`));
		}
	});
	console.log(
		'part 1: ',
		buffer.reduce((a, b) => a + b),
	);
};

part1(input);

const part2 = (input: Array<string>) => {
	buffer = [];
	input.forEach((line) => {
		// for (let i = 0; i < 100; i++) {
		// let line = input[i];
		line = textToNumber(line);
		line = findDigits(line);
		const test: Array<string> = line.split(',');
		switch (test.length) {
			case 0:
				break;
			default:
				buffer.push(parseInt(`${test[0]}${test[test.length - 1]}`));
		}
		console.log(buffer);
	});
	// }
	console.log(
		'part 2: ',
		buffer.reduce((a, b) => a + b),
	);
};

part2(input);
