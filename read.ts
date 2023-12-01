import fs from 'fs';
export function readFile(path: string): Array<string> {
	return fs.readFileSync(path, 'utf-8').split('\r\n');
}
