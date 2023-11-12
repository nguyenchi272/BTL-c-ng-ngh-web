import { config } from "dotenv";

config();

config({
    path:
        process.env.NODE_ENV === "prod"
            ? "./.env.production"
            : "./.env.development",
});

export default {
    knex: {
        client: 'pg',
        version: "7.2",

    },

    db: {
        name: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        user: process.env.POSTGRES_USER,
        port: Number(process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST,
    },

    jwt: {
        secret: process.env.JWT_SECRET || '',
    },

};
