"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const AuthMutations_1 = require("./auth/resolvers/AuthMutations");
const auth_1 = require("./auth/resolvers/Mutation/auth");
const user_1 = require("./user/resolvers/Query/user");
const UUID_1 = require("./base/resolvers/UUID");
const User_1 = require("./user/resolvers/User");
exports.resolvers = {
    Query: { user: user_1.user },
    Mutation: { auth: auth_1.auth },
    AuthMutations: AuthMutations_1.AuthMutations,
    UUID: UUID_1.UUID,
    User: User_1.User
};
