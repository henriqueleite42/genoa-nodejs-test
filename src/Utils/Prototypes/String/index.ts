export function camelToSnakeCase(str: string) {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function camelToSnakeUpperCase(str: string) {
	return str.replace(/[A-Z]/g, (letter) => `_${letter.toUpperCase()}`);
}
