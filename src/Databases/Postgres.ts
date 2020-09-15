import { Connection, createConnection } from "typeorm";

export class Postgres {
	private _connection: Connection;

	public async initialize() {
		let retries = 5;

		while (retries) {
			try {
				this._connection = await createConnection();

				break;
			} catch (error) {
				console.error(error);

				retries--;

				console.log(`Retires left: ${retries}`);

				// Wait 5 seconds
				await new Promise((resolve) => setTimeout(resolve, 5000));
			}
		}

		if (!this._connection) {
			throw new Error("UNABLE_TO_CONNECT_TO_DATABASE");
		}

		await this.runMigrations();
	}

	public async runMigrations() {
		const isPendingMigrations = await this._connection.showMigrations();

		if (isPendingMigrations) {
			await this._connection.runMigrations();
		}
	}
}
