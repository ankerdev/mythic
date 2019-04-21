import { Model, RelationMappings } from 'objection';
import { BaseModel, getModelClass, stringType, uuidType } from '../mythic';
import { User } from './user.model';

export class Post extends BaseModel {
  userId!: string;
  title!: string;
  content!: string;

  static modelName = 'Post';

  static tableName = 'posts';

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'userId',
        'title',
        'content',
      ],
      properties: {
        id: uuidType,
        userId: uuidType,
        title: stringType,
        content: stringType,
      },
    };
  }

  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: getModelClass(__dirname, 'user'),
      join: {
        from: 'posts.userId',
        to: 'users.id'
      }
    }
  }

  /**
   * Relationships.
   */
  async user(): Promise<User[]> {
    return await this.$relatedQuery<User>('user');
  }
}
