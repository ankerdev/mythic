import { IResolverObject } from 'graphql-tools';
import { IContext } from '../../declarations';
import { User } from '../../models';
import { Response } from '../../mythic';
import { userPolicy } from '../../policies';

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
      userPolicy.authorize('user', auth, user);
      return new Response(200, { user });
    },

    users: async (_, {}, { auth }: IContext) => {
      userPolicy.authorize('users', auth);
      const users = await User.query();
      return new Response(200, { users });
    },
  },

  Mutation: {
    createUser: async (_, { input }: IInputContext, { auth }: IContext) => {
      userPolicy.authorize('createUser', auth);
      const user = await User.query().insert(input);
      return user
        ? new Response(200, { user })
        : new Response(400, { message: 'Failed to create user' });
    },

    updateUser: async (_, { input }: IInputContext, { auth, user }: IModelContext) => {
      userPolicy.authorize('updateUser', auth, user);
      await user.$query().patchAndFetch(input);
      return new Response(200, { user });
    },

    deleteUser: async (_, { }, { auth, user }: IModelContext) => {
      userPolicy.authorize('deleteUser', auth, user);
      await user.$query().delete();
      return Response.NO_CONTENT;
    }
  }
};
