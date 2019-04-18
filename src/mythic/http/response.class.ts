import { KeyVal } from '../../declarations';

export class Response {
  code: number;
  success: boolean;
  message?: string;
  [key: string]: any;

  static NO_CONTENT: Response = new Response(204);
  static NOT_FOUND: Response = new Response(404, { message: 'Not found' });
  static UNAUTHORIZED: Response = new Response(403, { message: 'Unauthorized' });

  constructor(code: number, object: KeyVal<any> = {}) {
    this.code = code;
    this.success = code < 300;
    Object.keys(object).forEach(key => {
      this[key] = object[key];
    });
  }
}
