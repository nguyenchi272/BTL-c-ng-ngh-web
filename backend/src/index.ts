
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema/typeDefs.generated";
import { resolvers } from "./schema/resolvers.generated";
import config from './config';
import { JwtPayload, verify } from 'jsonwebtoken';
import { knex } from 'knex';
import { Context } from './types/context';
import { CustemJwtPayload } from './types/jwt';

const knexInstance = knex({
    client: config.knex.client,
    version: config.knex.version,
    connection: {
        port: config.db.port,
        database: config.db.name,
        host: config.db.host,
        password: config.db.password,
        user: config.db.user,
    },
});

const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
});

const parseJwtToken = (authorization?: string) => {
    let token;
    if (authorization && authorization.split("").length > 1) {
        token = authorization.split("")[1];
    }
    return token;
};

const jwtVerifyToken = async (token: string) => {
    let payload;
    try {
        payload = (await verify(token, config.jwt.secret)) as CustemJwtPayload;
    } catch (error) {
        console.info("Verifying jwt token failed", error)
    }

    return payload;
}

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const token = parseJwtToken(req.headers.authorization);

        let JwtPayload
        if (token) JwtPayload = await jwtVerifyToken(token);

        let user;
        if (JwtPayload) user = await knexInstance("user.base").select("*").where("id", JwtPayload?.sub).first();

        return {
            JwtPayload: user ? JwtPayload! : null,
        };
    },
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);

});


