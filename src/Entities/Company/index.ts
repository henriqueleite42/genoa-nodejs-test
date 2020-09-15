import {
	Column,
	CreateDateColumn,
	Entity,
	getRepository,
	Repository,
	PrimaryColumn,
} from "typeorm";

@Entity()
class Company {
	@PrimaryColumn({
		unique: true,
	})
	public readonly id: string;

	@Column({
		unique: true,
	})
	public readonly cnpj: string;

	@Column()
	public razaoSocial: string;

	@Column()
	public startDate: Date;

	@Column()
	public endDate: Date;

	@Column({
		precision: 2,
	})
	public totalAssets: number;

	@Column()
	public openingDate: Date;

	@CreateDateColumn()
	public readonly createdAt: Date;

	@CreateDateColumn({
		nullable: true,
	})
	public updatedAt: Date;
}

export type ICompanyRepository = Repository<Company>;

export const CompanyEntity = () => getRepository(Company);

export default Company;
