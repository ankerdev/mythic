import { IResolverObject } from 'graphql-tools';
import { User } from '../../models';
import { jwtService, Response } from '../../mythic';

export const authResolvers: IResolverObject = {
  Mutation: {
    createAuthenticationToken: async (_, { input }) => {
      const { email, password }: { email: string, password: string } = input;
      const user = await User.attemptLogin(email, password);
      if (user) {
        const { id } = user;
        const token = jwtService.create({ id });
        if (token) {
          return new Response(200, { token });
        }
      }
      return new Response(400, { message: 'The email or password is incorrect' });
    },
    // refreshAuthenticationToken: () => null, // @TODO
  }
};
