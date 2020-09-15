export interface IValidateCNPJ {
	cnpj: string;
}

export interface IValidateRazaoSocial {
	razaoSocial: string;
}

export interface IValidateStartDate {
	startDate: Date;
}

export interface IValidateEndDate {
	startDate: Date;
	endDate: Date;
}

export interface IValidateTotalAssets {
	totalAssets: number;
}

export interface IValidateOpeningDate {
	openingDate: Date;
}

export interface ICreate {
	cnpj: string;
	startDateMillis: number;
	endDateMillis: number;
	razaoSocial: string;
	totalAssets: number;
	openingDateMillis: number;
}

export interface IEdit {
	id: string;
	startDateMillis: number;
	endDateMillis: number;
	razaoSocial: string;
	totalAssets: number;
	openingDateMillis: number;
}
