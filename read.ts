import fs from 'fs';
export function readFile(path: string): string[] {
	return fs.readFileSync(path, 'utf-8').split('\r\n');
}
export function readFilePure(path: string): string {
	return fs.readFileSync(path, 'utf-8');
}
