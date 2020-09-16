import { maskCNPJ, unmaskCNPJ } from ".";

describe("maskCNPJ", () => {
	it("50.610.869/0001-26 > 50.610.869/0001-26", () => {
		const cnpj = "50.610.869/0001-26";

		const result = maskCNPJ(cnpj);

		expect(result).toBe("50.610.869/0001-26");
	});

	it("50610869000126 > 50.610.869/0001-26", () => {
		const cnpj = "50610869000126";

		const result = maskCNPJ(cnpj);

		expect(result).toBe("50.610.869/0001-26");
	});
});

describe("unmaskCNPJ", () => {
	it("50610869000126 > 50610869000126", () => {
		const cnpj = "50610869000126";

		const result = unmaskCNPJ(cnpj);

		expect(result).toBe("50610869000126");
	});

	it("50.610.869/0001-26 > 50610869000126", () => {
		const cnpj = "50.610.869/0001-26";

		const result = unmaskCNPJ(cnpj);

		expect(result).toBe("50610869000126");
	});
});
