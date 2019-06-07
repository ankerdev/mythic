import { Model, RelationMappings, JsonSchema } from 'objection';
import { BaseModel, createStringType, getModelClass, Hash, stringType, uuidPkType } from '../mythic';
import { Post } from './post.model';

export class User extends BaseModel {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  isAdmin!: boolean;

  static modelName = 'User';

  static tableName = 'users';

  static get jsonSchema(): JsonSchema {
    return {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'email',
        'password'
      ],
      properties: {
        id: uuidPkType,
        firstName: stringType,
        lastName: stringType,
        email: {
          format: 'email',
          ...stringType,
        },
        password: createStringType(6, 255),
        isAdmin: { type: 'boolean' },
      },
    };
  }

  static relationMappings: RelationMappings = {
    posts: {
      relation: Model.HasManyRelation,
      modelClass: getModelClass(__dirname, 'post'),
      join: {
        from: 'users.id',
        to: 'posts.userId'
      },
    },
  };

  /**
   * Relationships.
   */
  async posts(): Promise<Post[]> {
    return await this.$relatedQuery<Post>('posts');
  }

  /**
   * Functions.
   */
  static async attemptLogin(email: string, password: string): Promise<User | null> {
    const user = await this.query().where('email', email).first();
    if (user && await Hash.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  /**
   * Lifecycle.
   */
  async $beforeInsert(): Promise<void> {
    super.$beforeInsert();
    this.password = await Hash.make(this.password);
  }

  async $beforeUpdate(): Promise<void> {
    super.$beforeUpdate();
    if (this.password) {
      this.password = await Hash.make(this.password);
    }
  }
}
