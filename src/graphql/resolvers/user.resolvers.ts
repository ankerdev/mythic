import { IResolverObject } from 'graphql-tools';
import { Response } from '../../classes';
import { IContext } from '../../interfaces';
import { User } from '../../models';
import { userPolicy } from '../../policies';
import { HTTP } from '../../utils';

export const userResolvers: IResolverObject = {
  Query: {
    user: async (_, { id }: { id: string }, { auth }: IContext) => {
      if (!userPolicy.canAccess('user', auth, id)) { return HTTP.UNAUTHORIZED };
      const user = await User.query().findById(id);
      return user
        ? new Response(200, { user })
        : HTTP.NOT_FOUND;
    },

    users: async (_, {}, { auth }: IContext) => {
      if (!userPolicy.canAccess('users', auth)) { return HTTP.UNAUTHORIZED };
      const users = await User.query();
      return new Response(200, { users });
    },
  },

  Mutation: {
    createUser: async (_, { input }: { input: User }, { auth }: IContext) => {
      if (!userPolicy.canAccess('createUser', auth)) { return HTTP.UNAUTHORIZED };
      const user = await User.query().insert(input);
      return user
        ? new Response(200, { user })
        : new Response(400, { message: 'Failed to create user' });
    },

    updateUser: async (_, { input }: { input: User }, { auth }: IContext) => {
      if (!userPolicy.canAccess('updateUser', auth, input.id)) { return HTTP.UNAUTHORIZED };
      const user = await User.query().patchAndFetchById(input.id, input);
      return user
        ? new Response(200, { user })
        : HTTP.NOT_FOUND;
    },

    deleteUser: async (_, { id }: { id: string }, { auth }: IContext) => {
      if (!userPolicy.canAccess('deleteUser', auth, id)) { return HTTP.UNAUTHORIZED };
      const user = await User.query().findById(id);
      if (user) {
        await user.$query().delete();
        return HTTP.NO_CONTENT;
      }
      return HTTP.NOT_FOUND;
    }
  }
};
