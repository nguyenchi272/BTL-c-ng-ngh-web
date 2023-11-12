import { GraphQLError } from 'graphql';
import { Context } from '../../../../types/context';
import type { QueryResolvers } from './../../../types.generated';

export const user: NonNullable<QueryResolvers<Context>['user']> = async (_parent, _arg, _ctx) => {
        /* Implement Query.user resolver logic here */

        if (!_ctx.JwtPayload) throw new GraphQLError("Not Authenticated", {
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