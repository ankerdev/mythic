import { IResolverObject } from 'graphql-tools';
import { Response } from '../../classes';
import { IContext } from '../../interfaces';
import { User } from '../../models';
import { userPolicy } from '../../policies';
import { HTTP } from '../../utils';

interface IInputContext {
  input: User;
}

interface IModelContext {
  auth: User;
  user: User;
}

export const userResolvers: IResolverObject = {
  Query: {
    user: async (_, {}, { auth, user }: IModelContext) => {
      if (!userPolicy.canAccess('user', auth, user.id)) { return HTTP.UNAUTHORIZED };
      return new Response(200, { user });
    },

    users: async (_, {}, { auth }: IContext) => {
      if (!userPolicy.canAccess('users', auth)) { return HTTP.UNAUTHORIZED };
      const users = await User.query();
      return new Response(200, { users });
    },
  },

  Mutation: {
    createUser: async (_, { input }: IInputContext, { auth }: IContext) => {
      if (!userPolicy.canAccess('createUser', auth)) { return HTTP.UNAUTHORIZED };
      const user = await User.query().insert(input);
      return user
        ? new Response(200, { user })
        : new Response(400, { message: 'Failed to create user' });
    },

    updateUser: async (_, { input }: IInputContext, { auth, user }: IModelContext) => {
      if (!userPolicy.canAccess('updateUser', auth, user.id)) { return HTTP.UNAUTHORIZED };
      await user.$query().patchAndFetch(input);
      return new Response(200, { user });
    },

    deleteUser: async (_, { }, { auth, user }: IModelContext) => {
      if (!userPolicy.canAccess('deleteUser', auth, user.id)) { return HTTP.UNAUTHORIZED };
      await user.$query().delete();
      return HTTP.NO_CONTENT;
    }
  }
};
