import type { Knex } from "knex";
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
} = process.env;

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        pool: {
            min: 0,
            max: 5,
            idleTimeoutMillis: 10000,
        },
        connection: {
            host: '127.0.0.1',
            port: 5434,
            user: 'root',
            password: '123456',
            database: 'toDoList',
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: resolve(__dirname, 'migrations'),
        },
    }
};

export default config;
