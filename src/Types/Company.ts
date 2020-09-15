export interface ICompany {
	id: string;
	cnpj: string;
	razaoSocial: string;
	startDate: Date;
	endDate: Date;
	totalAssets: number;
	openingDate: Date;
	createdAt: Date;
	updatedAt?: Date;
}
