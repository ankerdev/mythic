import { IResolverObject } from 'graphql-tools';
import { ApiResponse } from '../../classes';
import { User } from '../../models';

// @TODO Implement policies

const NOT_FOUND: string = 'User not found';

export const userResolvers: IResolverObject = {
  Query: {
    user: async (_, { id }: { id: string }) => {
      const user = await User.query().findById(id);
      return user
        ? new ApiResponse(200, { user })
        : new ApiResponse(404, { message: NOT_FOUND });
    },
    users: async () => {
      const users = await User.query();
      return new ApiResponse(200, { users });
    },
  },

  Mutation: {
    createUser: async (_, { input }: { input: User }) => {
      const user = await User.query().insert(input);
      return user
        ? new ApiResponse(200, { user })
        : new ApiResponse(400, { message: 'Failed to create user' });
    },
    updateUser: async (_, { input }: { input: User }) => {
      const user = await User.query().patchAndFetchById(input.id, input);
      return user
        ? new ApiResponse(200, { user })
        : new ApiResponse(404, { message: NOT_FOUND });
    },
    deleteUser: async (_, { id }: { id: string }) => {
      const user = await User.query().findById(id);
      if (user) {
        await user.$query().delete();
        return new ApiResponse(204);
      }
      return new ApiResponse(404, { message: NOT_FOUND });
    }
  }
};
