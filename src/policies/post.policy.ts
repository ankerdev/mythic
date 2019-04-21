import { Policy } from '../mythic';
import { Post, User } from '../models';

class PostPolicy extends Policy {
  post(auth: User, post: Post): boolean {
    return auth.id === post.userId;
  }

  posts(): boolean {
    return false;
  }

  createPost(auth: User): boolean {
    return auth instanceof User;
  }

  updatePost(auth: User, post: Post): boolean {
    return auth.id === post.userId;
  }

  deletePost(auth: User, post: Post): boolean {
    return auth.id === post.userId;
  }
}

export const postPolicy = new PostPolicy();
