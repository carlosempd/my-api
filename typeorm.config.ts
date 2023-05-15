import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_TYPE,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: ["src/entity/*.ts"],
    entities: [__dirname + '/**/**/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
