"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const graphql_1 = require("graphql");
const user = async (_parent, _arg, _ctx) => {
    /* Implement Query.user resolver logic here */
    if (!_ctx.JwtPayload)
        throw new graphql_1.GraphQLError("Not Authenticated", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 },
            },
        });
    return {
        email: '',
        id: '',
    };
};
exports.user = user;
