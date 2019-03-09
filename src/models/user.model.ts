import { BaseModel } from '../lib/objection';
import { hashService } from '../services';

export class User extends BaseModel {
  first_name!: string;
  last_name!: string;
  email!: string;
  password!: string;

  static tableName = 'users';

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'first_name',
        'last_name',
        'email',
        'password'
      ],
      properties: {
        id: { type: 'string' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', format: 'email', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      }
    };
  }

  async $beforeInsert() {
    super.$beforeInsert();
    this.password = await hashService.make(this.password);
  }

  async $beforeUpdate() {
    super.$beforeUpdate();
    if (this.password) {
      this.password = await hashService.make(this.password);
    }
  }
}
