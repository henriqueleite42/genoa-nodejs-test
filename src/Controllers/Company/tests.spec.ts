import { CompanyController } from ".";

import { ICompanyRepository } from "@Entities/Company";

import Time, { ONE_YEAR } from "@Utils/Time";

import { ICreate, IEdit } from "./types";
import { ICompany } from "@Types/Company";

const companiesMock: Array<ICompany> = [
	{
		id: "1",
		cnpj: "36.790.354/0001-24",
		razaoSocial: "razaoSocial",
		startDate: new Time().getDate,
		endDate: new Time().addYears(1).getDate,
		totalAssets: 1000000,
		openingDate: new Time().removeYears(2).getDate,
		createdAt: new Date(),
	},
	{
		id: "2",
		cnpj: "cnpj",
		razaoSocial: "razaoSocial",
		startDate: new Date(),
		endDate: new Date(),
		totalAssets: 1,
		openingDate: new Date(),
		createdAt: new Date(),
	},
];

const GetAllCompaniesCompanyRepositoryMock = {
	find: jest.fn(() => companiesMock),
};

const CreateCompanyRepositoryMock = {
	insert: jest.fn((data: ICompany) => {
		const companyWithSameCNPJ = companiesMock.find(
			(doc) => doc.cnpj === data.cnpj
		);

		if (companyWithSameCNPJ) {
			throw new Error("DUPLICATED_CNPJ");
		}

		companiesMock.push(data);
	}),
};

const DeleteCompanyRepositoryMock = {
	delete: jest.fn(({ id }: { id: string }) => {
		const doc = companiesMock.find((doc) => doc.id === id);

		if (doc) {
			return {
				affected: 1,
			};
		}

		return "NO_UPDATED_DOCUMENTS";
	}),
};

const EditCompanyRepositoryMock = {
	findOne: jest.fn((id: string) => {
		const doc = companiesMock.find((doc) => doc.id === id);

		return doc;
	}),
	update: jest.fn(
		({ id }: { id: string }, newCompanyData: Partial<ICompany>) => {
			const docIndex = companiesMock.findIndex((doc) => doc.id === id);

			if (docIndex === -1) {
				return {
					affected: 0,
				};
			}

			companiesMock[docIndex] = {
				...companiesMock[docIndex],
				...newCompanyData,
			};

			return {
				affected: 1,
			};
		}
	),
};

describe("CompanyController.validateCNPJ", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const cnpj = "";

			companyController.validateCNPJ({ cnpj });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_CNPJ");
	});

	it("invalid because isn't string ", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const cnpj = 12345;

			companyController.validateCNPJ({ cnpj: (cnpj as unknown) as string });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_CNPJ_TYPE_STRING_EXPECTED");
	});

	it("invalid because nonstandard", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const cnpj = "736123123";

			companyController.validateCNPJ({ cnpj });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_CNPJ");
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const cnpj = "36.790.354/0001-24";

			companyController.validateCNPJ({ cnpj });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.validateRazaoSocial", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const razaoSocial = "";

			companyController.validateRazaoSocial({ razaoSocial });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_RAZAO_SOCIAL");
	});

	it("invalid because isn't string ", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const razaoSocial = 12345;

			companyController.validateRazaoSocial({
				razaoSocial: (razaoSocial as unknown) as string,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_RAZAO_SOCIAL_TYPE_STRING_EXPECTED");
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const razaoSocial = "razaoSocial";

			companyController.validateRazaoSocial({ razaoSocial });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.validateStartDate", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = undefined;

			companyController.validateStartDate({
				startDate: (startDate as unknown) as Date,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_START_DATE");
	});

	it("invalid because isn't Date", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = "isn't date";

			companyController.validateStartDate({
				startDate: (startDate as unknown) as Date,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_START_DATE_TYPE_DATE_EXPECTED");
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			// 1 January 2020
			const startDate = new Date(2020, 0, 1);

			companyController.validateStartDate({
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.validateEndDate", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = new Date();
			const endDate = undefined;

			companyController.validateEndDate({
				endDate: (endDate as unknown) as Date,
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_END_DATE");
	});

	it("invalid because isn't Date", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = new Date();
			const endDate = "isn't date";

			companyController.validateEndDate({
				endDate: (endDate as unknown) as Date,
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_END_DATE_TYPE_DATE_EXPECTED");
	});

	it("invalid because before start date", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = new Date(2020, 1, 1);
			const endDate = new Date(2020, 0, 1);

			companyController.validateEndDate({
				endDate,
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("END_DATE_MUST_BE_AFTER_START_DATE");
	});

	it("invalid because end date ins't exactly 365 days after start date", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = new Date(2020, 0, 1);
			const endDate = new Date(2020, 1, 1);

			companyController.validateEndDate({
				endDate,
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe(
			"END_DATE_MUST_BE_EXACTLY_365_DAYS_AFTER_START_DATE"
		);
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const startDate = new Date(2020, 0, 1);
			const endDate = new Date(2020, 11, 31);

			companyController.validateEndDate({
				endDate,
				startDate,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.validateTotalAssets", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const totalAssets = undefined;

			companyController.validateTotalAssets({
				totalAssets: (totalAssets as unknown) as number,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_TOTAL_ASSETS");
	});

	it("invalid because isn't number", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const totalAssets = "212";

			companyController.validateTotalAssets({
				totalAssets: (totalAssets as unknown) as number,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_TOTAL_ASSETS_TYPE_NUMBER_EXPECTED");
	});

	it("invalid because is lower than 1000000", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const totalAssets = 999999;

			companyController.validateTotalAssets({ totalAssets });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe(
			"TOTAL_ASSETS_MUST_BE_BETWEEN_1000000_AND_153000000"
		);
	});

	it("invalid because is bigger than 153000000", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const totalAssets = 153000001;

			companyController.validateTotalAssets({ totalAssets });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe(
			"TOTAL_ASSETS_MUST_BE_BETWEEN_1000000_AND_153000000"
		);
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const totalAssets = 1000000;

			companyController.validateTotalAssets({ totalAssets });
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.validateOpeningDate", () => {
	it("invalid because empty", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const openingDate = undefined;

			companyController.validateOpeningDate({
				openingDate: (openingDate as unknown) as Date,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_OPENING_DATE");
	});

	it("invalid because isn't Date", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const openingDate = "isn't date";

			companyController.validateOpeningDate({
				openingDate: (openingDate as unknown) as Date,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_OPENING_DATE_TYPE_DATE_EXPECTED");
	});

	it("invalid because is younger than 2 years", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const today = new Date().getTime();
			const oneYearAgo = new Date(today - ONE_YEAR);

			companyController.validateOpeningDate({
				openingDate: oneYearAgo,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("COMPANY_MUST_BE_AT_LEAST_TWO_YEARS_OLD");
	});

	it("ok", () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController({} as ICompanyRepository);

			const today = new Date().getTime();
			const twoYearsAgo = new Date(today - ONE_YEAR * 2);

			companyController.validateOpeningDate({
				openingDate: twoYearsAgo,
			});
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});
});

describe("CompanyController.getAllCompanies", () => {
	it("ok", async () => {
		const companyController = new CompanyController(
			(GetAllCompaniesCompanyRepositoryMock as unknown) as ICompanyRepository
		);

		const result = await companyController.getAllCompanies();

		expect(result).toBe(companiesMock);
	});
});

describe("CompanyController.create", () => {
	it("fail because duplicated cnpj", async () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController(
				(CreateCompanyRepositoryMock as unknown) as ICompanyRepository
			);

			const now = new Time();
			const oneYearForward = new Time().addYears(1);
			const twoYearsAgo = new Time().removeYears(2);

			const companyData: ICreate = {
				cnpj: "36.790.354/0001-24",
				startDateMillis: now.getMillis,
				razaoSocial: "razaoSocial",
				endDateMillis: oneYearForward.getMillis,
				openingDateMillis: twoYearsAgo.getMillis,
				totalAssets: 1000000,
			};

			await companyController.create(companyData);
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("");
	});

	it("ok", async () => {
		const companyController = new CompanyController(
			(CreateCompanyRepositoryMock as unknown) as ICompanyRepository
		);

		const now = new Time();
		const oneYearForward = new Time().addYears(1);
		const twoYearsAgo = new Time().removeYears(2);

		const companyData: ICreate = {
			cnpj: "50.610.869/0001-26",
			startDateMillis: now.getMillis,
			razaoSocial: "razaoSocial",
			endDateMillis: oneYearForward.getMillis,
			openingDateMillis: twoYearsAgo.getMillis,
			totalAssets: 1000000,
		};

		const docID = await companyController.create(companyData);

		const docCreated = companiesMock.find((company) => company.id === docID);

		expect(docCreated).toBeDefined();
	});
});

describe("CompanyController.edit", () => {
	it("fail because company dons't exists", async () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController(
				(EditCompanyRepositoryMock as unknown) as ICompanyRepository
			);

			const companyData = {
				id: "10",
			} as IEdit;

			await companyController.edit(companyData);
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("INVALID_COMPANY_ID");
	});

	it("ok", async () => {
		const companyController = new CompanyController(
			(EditCompanyRepositoryMock as unknown) as ICompanyRepository
		);

		const now = new Time();
		const oneYearForward = new Time().addYears(1);
		const twoYearsAgo = new Time().removeYears(2);

		const companyData: IEdit = {
			id: "1",
			startDateMillis: now.getMillis,
			razaoSocial: "new razaoSocial",
			endDateMillis: oneYearForward.getMillis,
			openingDateMillis: twoYearsAgo.getMillis,
			totalAssets: 1000000,
		};

		const docBeforeEdit = companiesMock.find(
			(company) => company.id === companyData.id
		);
		const razaoSocialBeforeEdit = docBeforeEdit?.razaoSocial;

		const docID = await companyController.edit(companyData);

		const docEdited = companiesMock.find((company) => company.id === docID);

		const razaoSocialWasChanged =
			razaoSocialBeforeEdit !== docEdited?.razaoSocial;
		const razaoSocialEditedIsEqual =
			docEdited?.razaoSocial === companyData.razaoSocial;

		expect(razaoSocialWasChanged && razaoSocialEditedIsEqual).toBe(true);
	});
});

describe("CompanyController.delete", () => {
	it("fail because invalid id", async () => {
		let errorMessage = "";

		try {
			const companyController = new CompanyController(
				(DeleteCompanyRepositoryMock as unknown) as ICompanyRepository
			);

			const docID = "3";

			await companyController.delete(docID);
		} catch (error) {
			errorMessage = error.message;
		}

		expect(errorMessage).toBe("NO_UPDATED_DOCUMENTS");
	});

	it("ok", async () => {
		const companyController = new CompanyController(
			(DeleteCompanyRepositoryMock as unknown) as ICompanyRepository
		);

		const docID = "1";

		const result = await companyController.delete(docID);

		expect(result).toBe(docID);
	});
});
