import { Model, RelationMappings } from 'objection';
import { BaseModel, getModelClass } from '../mythic';
import { User } from './user.model';

export class Post extends BaseModel {
  user_id!: string;
  title!: string;
  content!: string;

  static tableName = 'posts';

  static modelName = 'Post';

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'title',
        'content',
      ],
      properties: {
        id: { type: 'string' },
        user_id: { type: 'string' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        content: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: getModelClass(__dirname, 'user'),
      join: {
        from: 'posts.user_id',
        to: 'users.id'
      }
    }
  }

  /**
   * Relationships.
   *
   * @return {Model | Model[]}
   */
  async user() {
    return await this.$relatedQuery<User>('user');
  }
}
