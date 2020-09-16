import { camelToSnakeCase, camelToSnakeUpperCase } from ".";

describe("camelToSnakeCase", () => {
	it("camelToSnakeCase > camel_to_snake_case", () => {
		const input = "camelToSnakeCase";

		const output = camelToSnakeCase(input);

		expect(output).toBe("camel_to_snake_case");
	});

	it("xYz > x_yz", () => {
		const input = "xYz";

		const output = camelToSnakeCase(input);

		expect(output).toBe("x_yz");
	});
});

describe("camelToSnakeUpperCase", () => {
	it("camelToSnakeUpperCase > CAMEL_TO_SNAKE_UPPER_CASE", () => {
		const input = "camelToSnakeUpperCase";

		const output = camelToSnakeUpperCase(input);

		expect(output).toBe("CAMEL_TO_SNAKE_UPPER_CASE");
	});

	it("xYz > x_yz", () => {
		const input = "xYz";

		const output = camelToSnakeUpperCase(input);

		expect(output).toBe("X_YZ");
	});
});
