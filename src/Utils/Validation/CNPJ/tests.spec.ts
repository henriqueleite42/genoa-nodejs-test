import { checkCNPJ } from ".";

describe("checkCNPJ", () => {
	it("invalid because empty", () => {
		const cnpj = "";

		const isValid = checkCNPJ(cnpj);

		expect(isValid).toBe(false);
	});

	it("invalid because nonstandard", () => {
		const cnpj = "32131231336655";

		const isValid = checkCNPJ(cnpj);

		expect(isValid).toBe(false);
	});

	it("valid with mask", () => {
		const cnpj = "36.790.354/0001-24";

		const isValid = checkCNPJ(cnpj);

		expect(isValid).toBe(true);
	});

	it("valid only numbers", () => {
		const cnpj = "77062304000108";

		const isValid = checkCNPJ(cnpj);

		expect(isValid).toBe(true);
	});
});
