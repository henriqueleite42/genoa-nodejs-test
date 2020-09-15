import express from "express";

import { Postgres } from "@Databases/Postgres";

import { Router } from "@Routes/index";

import "reflect-metadata";

class App {
	private _app: express.Express;

	public constructor() {
		const initialize = async () => {
			this._app = express();

			// Database
			const postgres = new Postgres();
			await postgres.initialize();

			// MiddleWares
			this.middewares();

			// Routes
			new Router(this._app);

			// Start Server
			this._app.listen(8080, () => {
				console.log("App running on port 8080");
			});
		};

		initialize();
	}

	private middewares() {
		this._app.use(express.json());

		// Set CORS headers
		this._app.use((req, res, next) => {
			res.header("Access-Control-Allow-Credentials", "true");
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
			res.header(
				"Access-Control-Allow-Headers",
				"Content-Type, Authorization, Content-Length, X-Requested-With"
			);

			next();
		});
	}
}

new App();
