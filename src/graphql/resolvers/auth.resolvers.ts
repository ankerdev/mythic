import { IResolverObject } from 'graphql-tools';
import { ApiResponse } from '../../classes';
import { User } from '../../models';
import { jwtService } from '../../services';

export const authResolvers: IResolverObject = {
  Mutation: {
    createAuthenticationToken: async (_, { input }) => {
      const { email, password }: { email: string, password: string } = input;
      const user = await User.attemptLogin(email, password);
      if (user) {
        const { id } = user;
        const token = jwtService.create({ id });
        if (token) {
          return new ApiResponse(200, { token });
        }
      }
      return new ApiResponse(400, { message: 'The email or password is incorrect' });
    },
    // refreshAuthenticationToken: () => null, // @TODO
  }
};
