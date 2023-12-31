/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { AuthMutations } from './auth/resolvers/AuthMutations';
import    { auth as Mutation_auth } from './auth/resolvers/Mutation/auth';
import    { user as Query_user } from './user/resolvers/Query/user';
import    { UUID } from './base/resolvers/UUID';
import    { User } from './user/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { user: Query_user },
      Mutation: { auth: Mutation_auth },
      
      AuthMutations: AuthMutations,
UUID: UUID,
User: User
    }