import { IResolverObject } from 'graphql-tools';
import { Response } from '../../classes';
import { IContext } from '../../interfaces';
import { Post, User } from '../../models';
import { postPolicy } from '../../policies';
import { HTTP } from '../../utils';

interface IInputContext {
  input: Post;
}

interface IModelContext {
  auth: User;
  post: Post;
}

export const postResolvers: IResolverObject = {
  Query: {
    post: async (_, {}, { auth, post }: IModelContext) => {
      if (!postPolicy.authorize('post', auth, post)) { return HTTP.UNAUTHORIZED };
      return new Response(200, { post });
    },

    posts: async (_, {}, { auth }: IContext) => {
      if (!postPolicy.authorize('posts', auth)) { return HTTP.UNAUTHORIZED };
      const posts = await Post.query();
      return new Response(200, { posts });
    },
  },

  Mutation: {
    createPost: async (_, { input }: IInputContext, { auth }: IContext) => {
      if (!postPolicy.authorize('createPost', auth)) { return HTTP.UNAUTHORIZED };
      const post = await Post.query().insert(input);
      return post
        ? new Response(200, { post })
        : new Response(400, { message: 'Failed to create post' });
    },

    updatePost: async (_, { input }: IInputContext, { auth, post }: IModelContext) => {
      if (!postPolicy.authorize('updatePost', auth, post)) { return HTTP.UNAUTHORIZED };
      await post.$query().patchAndFetch(input);
      return new Response(200, { post });
    },

    deletePost: async (_, {}, { auth, post }: IModelContext) => {
      if (!postPolicy.authorize('deletePost', auth, post)) { return HTTP.UNAUTHORIZED };
      await post.$query().delete();
      return HTTP.NO_CONTENT;
    }
  }
};
