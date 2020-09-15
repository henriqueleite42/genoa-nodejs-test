export function maskCNPJ(v: string) {
	if (!v) return "";

	return v
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1/$2")
		.replace(/(\d)(\d{2})$/, "$1-$2");
}

export function unmaskCNPJ(v: string): string {
	if (!v) return "";

	return v.replace(/[^\d]+/g, "");
}
