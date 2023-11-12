import type { MutationResolvers } from './../../../types.generated';
export const auth: NonNullable<MutationResolvers['auth']> = async (
        _parent,
        { password, email },
        _ctx) => {
        return {
                password,
                email,
        };
};