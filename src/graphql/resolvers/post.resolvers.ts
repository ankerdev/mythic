import { IResolverObject } from 'graphql-tools';
import { IConnectionParameters, IConnection, IContext } from '../../declarations';
import { Post, User } from '../../models';
import { toConnectionObject } from '../../mythic';
import { postPolicy } from '../../policies';

interface IInput {
  input: Post;
}

interface IModelContext {
  auth: User;
  post: Post;
}

export const postResolvers: IResolverObject = {
  Query: {
    post: (_, {}, { auth, post }: IModelContext): Post => {
      postPolicy.authorize('post', auth, post);
      return post;
    },

    posts: async (_, connectionParams: IConnectionParameters, { auth }: IContext): Promise<IConnection<Post>> => {
      postPolicy.authorize('posts', auth);
      const posts = await Post.paginate(connectionParams);
      return toConnectionObject(posts);
    },
  },

  Mutation: {
    createPost: async (_, { input }: IInput, { auth }: IContext): Promise<Post> => {
      postPolicy.authorize('createPost', auth);
      Post.validate(input);
      const post = await Post.query().insert(input);
      return post;
    },

    updatePost: async (_, { input }: IInput, { auth, post }: IModelContext): Promise<Post> => {
      postPolicy.authorize('updatePost', auth, post);
      Post.validateUpdate(input);
      await post.$query().patchAndFetch(input);
      return post;
    },

    deletePost: async (_, {}, { auth, post }: IModelContext): Promise<string> => {
      postPolicy.authorize('deletePost', auth, post);
      await post.$query().delete();
      return post.id;
    },
  },
};
