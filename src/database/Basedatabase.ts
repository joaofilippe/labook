import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export default class BaseDatabase {

    port: number = Number(process.env.DB_PORT);
    
    protected connection = knex({
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: this.port || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
    });
}


