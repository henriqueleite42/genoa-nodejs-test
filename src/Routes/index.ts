import { Express } from "express";

import { CompanyRouter } from "./Company";

export class Router {
	public constructor(app: Express) {
		new CompanyRouter(app);
	}
}
