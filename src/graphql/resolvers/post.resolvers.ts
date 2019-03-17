import { IResolverObject } from 'graphql-tools';
import { Response } from '../../classes';
import { IContext } from '../../interfaces';
import { Post } from '../../models';
import { postPolicy } from '../../policies';
import { HTTP } from '../../utils';

export const postResolvers: IResolverObject = {
  Query: {
    post: async (_, { id }: { id: string }, { auth }: IContext) => {
      const post = await Post.query().findById(id);
      if (!post) { return HTTP.NOT_FOUND; }
      if (!postPolicy.canAccess('post', auth, post)) { return HTTP.UNAUTHORIZED };
      return new Response(200, { post });
    },

    posts: async (_, {}, { auth }: IContext) => {
      if (!postPolicy.canAccess('posts', auth)) { return HTTP.UNAUTHORIZED };
      const posts = await Post.query();
      return new Response(200, { posts });
    },
  },

  Mutation: {
    createPost: async (_, { input }: { input: Post }, { auth }: IContext) => {
      if (!postPolicy.canAccess('createPost', auth)) { return HTTP.UNAUTHORIZED };
      const post = await Post.query().insert(input);
      return post
        ? new Response(200, { post })
        : new Response(400, { message: 'Failed to create post' });
    },

    updatePost: async (_, { input }: { input: Post }, { auth }: IContext) => {
      const post = await Post.query().findById(input.id);
      if (!post) { return HTTP.NOT_FOUND; }
      if (!postPolicy.canAccess('updatePost', auth, post)) { return HTTP.UNAUTHORIZED };
      post.$query().patchAndFetch(input);
      return new Response(200, { post });
    },

    deletePost: async (_, { id }: { id: string }, { auth }: IContext) => {
      const post = await Post.query().findById(id);
      if (!post) { return HTTP.NOT_FOUND; }
      if (!postPolicy.canAccess('deletePost', auth, post)) { return HTTP.UNAUTHORIZED };
      if (post) {
        await post.$query().delete();
        return HTTP.NO_CONTENT;
      }
      return HTTP.NOT_FOUND;
    }
  }
};
