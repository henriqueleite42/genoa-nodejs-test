import { Express, Request, Response, Router } from "express";

import { CompanyController } from "@Controllers/Company";

import { CompanyEntity } from "@Entities/Company";

import Time from "@Utils/Time";

export class CompanyRouter {
	public constructor(app: Express) {
		const router = Router();

		router.get("/get-all-companies", this.getAllCompanies);

		router.post("/create", this.create);

		router.put("/edit", this.edit);

		router.delete("/delete", this.edit);

		app.use("/companies", router);
	}

	public async getAllCompanies(req: Request, res: Response) {
		try {
			const companyController = new CompanyController(CompanyEntity());

			const companies = await companyController.getAllCompanies();

			res.json(companies);
		} catch (error) {
			console.error(error);

			res.status(499).json({
				message: error.message,
			});
		}
	}

	public async create(req: Request, res: Response) {
		try {
			const { automaticEndDate } = req.query;

			/**
			 * Automaticly add EndDate
			 */
			if (automaticEndDate) {
				const { startDateMillis } = req.body;

				if (startDateMillis) {
					const endDateTimeInstance = new Time(startDateMillis);

					req.body.endDateMillis = endDateTimeInstance.addYears(1).getMillis;
				}
			}

			const companyController = new CompanyController(CompanyEntity());

			const companyID = await companyController.create(req.body);

			res.json({ id: companyID });
		} catch (error) {
			console.error(error);

			res.status(499).json({
				message: error.message,
			});
		}
	}

	public async edit(req: Request, res: Response) {
		try {
			const companyController = new CompanyController(CompanyEntity());

			const companyID = await companyController.edit(req.body);

			res.json({ id: companyID });
		} catch (error) {
			console.error(error);

			res.status(499).json({
				message: error.message,
			});
		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const companyController = new CompanyController(CompanyEntity());

			const { id } = req.body;

			if (!id) throw new Error("INVALID_ID");

			if (typeof id !== "string") {
				throw new Error("INVALID_ID_TYPE_STRING_EXPECTED");
			}

			await companyController.delete(id);

			return id;
		} catch (error) {
			console.error(error);

			res.status(499).json({
				message: error.message,
			});
		}
	}
}
