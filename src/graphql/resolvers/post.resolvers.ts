import { IResolverObject } from 'graphql-tools';
import { IContext } from '../../declarations';
import { Post, User } from '../../models';
import { Response } from '../../mythic';
import { postPolicy } from '../../policies';

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
      postPolicy.authorize('post', auth, post);
      return new Response(200, { post });
    },

    posts: async (_, {}, { auth }: IContext) => {
      postPolicy.authorize('posts', auth);
      const posts = await Post.query();
      return new Response(200, { posts });
    },
  },

  Mutation: {
    createPost: async (_, { input }: IInputContext, { auth }: IContext) => {
      postPolicy.authorize('createPost', auth);
      const post = await Post.query().insert(input);
      return post
        ? new Response(200, { post })
        : new Response(400, { message: 'Failed to create post' });
    },

    updatePost: async (_, { input }: IInputContext, { auth, post }: IModelContext) => {
      postPolicy.authorize('updatePost', auth, post);
      await post.$query().patchAndFetch(input);
      return new Response(200, { post });
    },

    deletePost: async (_, {}, { auth, post }: IModelContext) => {
      postPolicy.authorize('deletePost', auth, post);
      await post.$query().delete();
      return Response.NO_CONTENT;
    }
  }
};
