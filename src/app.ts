import express from "express";
import router from "./routes/index.route";
import knex from 'knex';
import knexConfig from '../databases/knex/knexfile';

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
        this.runMigrations();
    }

    private middleware() {
        this.server.use(express.json());
    }

    private router() {
        this.server.use(router);
    }

    private async runMigrations() {
        try {
            const db = knex(knexConfig.development);
            console.log('Running migrations...');
            await db.migrate.latest();
            console.log('Migrations completed');
        } catch (error) {
            console.error('Migration failed', error);
        }
    }
} 