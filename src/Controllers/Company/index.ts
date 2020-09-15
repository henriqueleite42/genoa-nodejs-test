import { uuid } from "uuidv4";

import { unmaskCNPJ } from "../../Utils/Mask/CNPJ";

import { ICompanyRepository } from "@Entities/Company";

import Time from "@Utils/Time";
import { checkCNPJ } from "@Utils/Validation/CNPJ";

import {
	ICreate,
	IValidateCNPJ,
	IValidateRazaoSocial,
	IValidateStartDate,
	IValidateEndDate,
	IValidateTotalAssets,
	IValidateOpeningDate,
	IEdit,
} from "./types";
import { ICompany } from "@Types/Company";

export class CompanyController {
	private _companyEntity: ICompanyRepository;

	public constructor(companyRepository: ICompanyRepository) {
		this._companyEntity = companyRepository;
	}

	public validateCNPJ({ cnpj }: IValidateCNPJ) {
		if (!cnpj) throw new Error("INVALID_CNPJ");

		if (typeof cnpj !== "string") {
			throw new Error("INVALID_CNPJ_TYPE_STRING_EXPECTED");
		}

		if (!checkCNPJ(cnpj)) {
			throw new Error("INVALID_CNPJ");
		}
	}

	public validateRazaoSocial({ razaoSocial }: IValidateRazaoSocial) {
		if (!razaoSocial) throw new Error("INVALID_RAZAO_SOCIAL");

		if (typeof razaoSocial !== "string") {
			throw new Error("INVALID_RAZAO_SOCIAL_TYPE_STRING_EXPECTED");
		}
	}

	public validateStartDate({ startDate }: IValidateStartDate) {
		if (!startDate) throw new Error("INVALID_START_DATE");

		if (!Time.isDate(startDate)) {
			throw new Error("INVALID_START_DATE_TYPE_DATE_EXPECTED");
		}

		if (!Time.isValid(startDate)) {
			throw new Error("INVALID_START_DATE");
		}
	}

	public validateEndDate({ startDate, endDate }: IValidateEndDate) {
		if (!endDate) throw new Error("INVALID_END_DATE");

		if (!Time.isDate(endDate)) {
			throw new Error("INVALID_END_DATE_TYPE_DATE_EXPECTED");
		}

		if (!Time.isValid(endDate)) {
			throw new Error("INVALID_END_DATE");
		}

		// Checks whether the end date is after start date
		const endDateTimeInstace = new Time(endDate);

		if (endDateTimeInstace.isBefore(startDate)) {
			throw new Error("END_DATE_MUST_BE_AFTER_START_DATE");
		}

		// Checks if the end date is at least 1 year after start date
		const oneYearAfterStartDate = new Time(startDate).addYears(1).getMillis;

		if (!endDateTimeInstace.isSameDay(oneYearAfterStartDate)) {
			throw new Error("END_DATE_MUST_BE_EXACTLY_ONE_YEAR_AFTER_START_DATE");
		}
	}

	public validateTotalAssets({ totalAssets }: IValidateTotalAssets) {
		if (!totalAssets) throw new Error("INVALID_TOTAL_ASSETS");

		if (typeof totalAssets !== "number") {
			throw new Error("INVALID_TOTAL_ASSETS_TYPE_NUMBER_EXPECTED");
		}

		// checks if the total assets is within budget
		if (totalAssets < 1000000 || totalAssets > 153000000) {
			throw new Error("TOTAL_ASSETS_MUST_BE_BETWEEN_1000000_AND_153000000");
		}
	}

	public validateOpeningDate({ openingDate }: IValidateOpeningDate) {
		if (!openingDate) throw new Error("INVALID_OPENING_DATE");

		if (!Time.isDate(openingDate)) {
			throw new Error("INVALID_OPENING_DATE_TYPE_DATE_EXPECTED");
		}

		if (!Time.isValid(openingDate)) {
			throw new Error("INVALID_OPENING_DATE");
		}

		// Checks if the company is at least 2 years old
		const twoYearsAgo = new Time().removeYears(2);

		if (twoYearsAgo.isBefore(openingDate)) {
			throw new Error("COMPANY_MUST_BE_AT_LEAST_TWO_YEARS_OLD");
		}
	}

	public async getAllCompanies() {
		const companies = await this._companyEntity.find();

		return companies;
	}

	public async create(companyData: ICreate) {
		if (!companyData) throw new Error("INVALID_DATA");

		const {
			cnpj,
			startDateMillis,
			razaoSocial,
			endDateMillis,
			totalAssets,
			openingDateMillis,
		} = companyData;

		const startDate = new Date(startDateMillis);
		const endDate = new Date(endDateMillis);
		const openingDate = new Date(openingDateMillis);

		this.validateCNPJ({ cnpj });
		this.validateRazaoSocial({ razaoSocial });
		this.validateStartDate({ startDate });
		this.validateEndDate({ endDate, startDate });
		this.validateTotalAssets({ totalAssets });
		this.validateOpeningDate({ openingDate });

		const id = uuid();
		const cnpjUnmasked = unmaskCNPJ(cnpj);

		const newCompanyDate: ICompany = {
			id,
			cnpj: cnpjUnmasked,
			razaoSocial,
			startDate,
			endDate,
			totalAssets,
			openingDate,
			createdAt: new Time().getDate,
		};

		await this._companyEntity.insert(newCompanyDate);

		return id;
	}

	public async edit(companyData: IEdit) {
		if (!companyData) throw new Error("INVALID_DATA");

		const {
			id,
			startDateMillis,
			razaoSocial,
			endDateMillis,
			totalAssets,
			openingDateMillis,
		} = companyData;

		const originalCompanyData = await this._companyEntity.findOne(id, {
			select: ["startDate", "endDate", "openingDate"],
		});

		if (!originalCompanyData) throw new Error("INVALID_COMPANY_ID");

		const {
			startDate: originalStartDate,
			endDate: originalEndDate,
			openingDate: originalOpeningDate,
		} = originalCompanyData;

		const startDate = startDateMillis
			? new Date(startDateMillis)
			: originalStartDate;

		const endDate = endDateMillis ? new Date(endDateMillis) : originalEndDate;

		const openingDate = openingDateMillis
			? new Date(openingDateMillis)
			: originalOpeningDate;

		if (razaoSocial) this.validateRazaoSocial({ razaoSocial });
		if (typeof totalAssets !== "undefined") {
			this.validateTotalAssets({ totalAssets });
		}

		this.validateStartDate({ startDate });
		this.validateEndDate({ endDate, startDate });
		this.validateOpeningDate({ openingDate });

		const newCompanyData: Partial<ICompany> = {
			startDate,
			endDate,
			openingDate,
			updatedAt: new Time().getDate,
		};

		if (razaoSocial) {
			newCompanyData.razaoSocial = razaoSocial;
		}
		if (typeof totalAssets !== "undefined") {
			newCompanyData.totalAssets = totalAssets;
		}

		const result = await this._companyEntity.update({ id }, newCompanyData);

		if (!result.affected || result.affected < 1) {
			throw new Error("NO_UPDATED_DOCUMENTS");
		}

		return id;
	}

	public async delete(id: string) {
		const result = await this._companyEntity.delete({ id });

		if (!result.affected || result.affected < 1) {
			throw new Error("NO_UPDATED_DOCUMENTS");
		}

		return id;
	}
}
