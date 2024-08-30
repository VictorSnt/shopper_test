import { Measurement } from '../models/measurement';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/adapters/db/database.sqlite",
    synchronize: false,
    logging: false,
    entities: [Measurement],
});
