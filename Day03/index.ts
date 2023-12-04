import { readFile } from '../read';

const example: Array<string> = readFile('Day03/example.txt');
const input: Array<string> = readFile('Day03/input.txt');

const findEnginePart = (
	schematic: string,
): Array<{ [key: string]: number }> => {
	const matches = schematic.match(/\d+/g);
	let partNumber: number = 0;
	let start: number = 0;
	let end: number = 0;
	let parts: Array<{ [key: string]: number }> = [];
	matches?.map((match) => {
		partNumber = parseInt(match);
		start = schematic.indexOf(match);
		end = schematic.indexOf(match) + match.length;

		if (partNumber !== 0) {
			parts.push({ partNumber: partNumber, start: start, end: end });
		}
	});
	return parts;
};
const findSymbolPositions = (schematic: string): string => {
	const matches = schematic.match(/[^a-zA-Z0-9.]/g);
	let positions: Array<number> = [];
	matches?.map((match) => {
		positions.push(schematic.indexOf(match));
	});
	return positions.toString();
};

const checkValidEnginePart = (
	enginePart: { [key: string]: number },
	symbolPosition: string,
): boolean => {
	if (
		parseInt(symbolPosition) >= enginePart.start - 1 &&
		parseInt(symbolPosition) <= enginePart.end + 1
	) {
		return true;
	} else {
		return false;
	}
};
const part1 = (input: Array<string>) => {
	let parts: Array<Array<{ [key: string]: number }>> = [];
	let symbols: Array<string> = [];
	let engineParts: Array<number> = [];
	input.forEach((schematic) => {
		parts.push(findEnginePart(schematic));
		symbols.push(findSymbolPositions(schematic));
	});
	for (let i = 0; i < input.length; i++) {
		// check if partNumber is found in line
		if (parts[i].length > 1) {
			parts[i].forEach((part) => {
				if (checkValidEnginePart(part, symbols[i])) {
					engineParts.push(part.partNumber);
				}
				if (i > 0 && checkValidEnginePart(part, symbols[i - 1])) {
					engineParts.push(part.partNumber);
				}
				if (i < input.length && checkValidEnginePart(part, symbols[i + 1])) {
					engineParts.push(part.partNumber);
				}
			});
		} else if (parts[i].length === 1) {
		}
		parts[i];
		symbols[i];
	}
	console.log('parts ', parts);
	console.log('symbols ', symbols);
	console.log('Part 1: ', 'test');
};

console.time('Part 1');
part1(example);
console.timeEnd('Part 1');
