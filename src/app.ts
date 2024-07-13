import express from "express";
import router from "./routes/index.route";
import knex from 'knex';
import knexConfig from '../databases/knex/knexfile';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import cors from 'cors';

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
        this.runMigrations();
        this.setupSwagger();
    }

    private middleware() {
        this.server.use(cors());
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

    private setupSwagger() {
        // Caminho para o arquivo openapi.yml
        const swaggerDocumentPath = path.join(__dirname, '../docs/openapi/openapi.yml');
        console.log('Swagger document path:', swaggerDocumentPath);
        const swaggerDocument = YAML.load(swaggerDocumentPath);

        // Configurar Swagger UI
        this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        console.log('Swagger API docs available at /api-docs');
    }
} 