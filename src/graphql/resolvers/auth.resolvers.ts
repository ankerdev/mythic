import { UserInputError } from 'apollo-server-core';
import { IResolverObject } from 'graphql-tools';
import { User } from '../../models';
import { jwtService } from '../../mythic';

export const authResolvers: IResolverObject = {
  Mutation: {
    createAuthenticationToken: async (_, { input }): Promise<string> => {
      const { email, password }: { email: string, password: string } = input;
      const user = await User.attemptLogin(email, password);
      if (user) {
        const { id } = user;
        const token = jwtService.create({ id });
        if (token) {
          return token;
        }
      }
      throw new UserInputError('The email or password is incorrect');
    },

    // refreshAuthenticationToken: () => null, // @TODO
  }
};
