"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const typeDefs_generated_1 = require("./schema/typeDefs.generated");
const resolvers_generated_1 = require("./schema/resolvers.generated");
const config_1 = __importDefault(require("./config"));
const jsonwebtoken_1 = require("jsonwebtoken");
const knex_1 = require("knex");
const knexInstance = (0, knex_1.knex)({
    client: config_1.default.knex.client,
    version: config_1.default.knex.version,
    connection: {
        port: config_1.default.db.port,
        database: config_1.default.db.name,
        host: config_1.default.db.host,
        password: config_1.default.db.password,
        user: config_1.default.db.user,
    },
});
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_generated_1.typeDefs,
    resolvers: resolvers_generated_1.resolvers,
});
const parseJwtToken = (authorization) => {
    let token;
    if (authorization && authorization.split("").length > 1) {
        token = authorization.split("")[1];
    }
    return token;
};
const jwtVerifyToken = async (token) => {
    let payload;
    try {
        payload = (await (0, jsonwebtoken_1.verify)(token, config_1.default.jwt.secret));
    }
    catch (error) {
        console.info("Verifying jwt token failed", error);
    }
    return payload;
};
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        const token = parseJwtToken(req.headers.authorization);
        let JwtPayload;
        if (token)
            JwtPayload = await jwtVerifyToken(token);
        let user;
        if (JwtPayload)
            user = await knexInstance("user.base").select("*").where("id", JwtPayload?.sub).first();
        return {
            JwtPayload: user ? JwtPayload : null,
        };
    },
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
