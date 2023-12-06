import { parse } from 'path';
import { readFile, readFilePure } from '../read';

const example = readFilePure('./Day05/example.txt');
const input = readFilePure('./Day05/input.txt');
//0: seed to soil
//1: soil to fertilizer
//2: fertilizer to water
//3: water to light
//4: light to temperature
//5: temperature to humidity
//6: humidity to location

const mapLocation = (seed: number, maps: string[][]): number => {
	let seedBuffer: number = seed;
	for (let mapNumber = 0; mapNumber < maps.length; mapNumber++) {
		let shouldBreak: boolean = false;
		maps[mapNumber].forEach((coordinates) => {
			const [end, start, range] = coordinates.split(' ');

			if (
				seedBuffer >= parseInt(start) &&
				seedBuffer <= parseInt(start) + parseInt(range) &&
				!shouldBreak
			) {
				seedBuffer = seedBuffer - parseInt(start) + parseInt(end);
				shouldBreak = true;
			}
		});
	}

	return seedBuffer;
};
const part1 = (input: string) => {
	const [seeds, ...unfilteredMaps] = input.split(/\r\n\s*\r\n/);

	let filteredMaps: string[][] = [];

	let locations: number[] = [];

	unfilteredMaps.forEach((unfilteredMap) => {
		filteredMaps.push(unfilteredMap.split('\r\n'));
	});
	const headers: string[] = filteredMaps.map((filteredMap) => filteredMap[0]);

	const maps: string[][] = filteredMaps.map((filteredMap) =>
		filteredMap.slice(1),
	);
	const seedsInt: number[] = seeds
		.split(':')[1]
		.trim()
		.split(' ')
		.map((seed) => parseInt(seed));

	seedsInt.forEach((seed) => {
		// [14].forEach((seed) => {
		locations.push(mapLocation(seed, maps));
	});
	console.log('Part 1:', Math.min(...locations));
};

console.time('Part 1');
part1(input);
console.timeEnd('Part 1');

const part2 = (input: string) => {
	const [seeds, ...unfilteredMaps] = input.split(/\r\n\s*\r\n/);
	let actualSeeds: number[] = [];
	let filteredMaps: string[][] = [];

	let locations: number[] = [];

	unfilteredMaps.forEach((unfilteredMap) => {
		filteredMaps.push(unfilteredMap.split('\r\n'));
	});
	const headers: string[] = filteredMaps.map((filteredMap) => filteredMap[0]);

	const maps: string[][] = filteredMaps.map((filteredMap) =>
		filteredMap.slice(1),
	);
	const seedsInt: number[] = seeds
		.split(':')[1]
		.trim()
		.split(' ')
		.map((seed) => parseInt(seed));

	for (let i = 0; i < seedsInt.length / 2 + 1; i += 2) {
		for (let j = seedsInt[i]; j <= seedsInt[i] + seedsInt[i + 1] - 1; j++) {
			actualSeeds.push(j);
		}
		actualSeeds.forEach((seed) => {
			locations.push(mapLocation(seed, maps));
		});
	}

	console.log('Part 2:', Math.min(...locations));
};

console.time('Part 2');
part2(input);
console.timeEnd('Part 2');
