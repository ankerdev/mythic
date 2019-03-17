import { KeyVal } from '../types';

export class Response {
  code: number;
  success: boolean;
  [key: string]: any;

  constructor(code: number, object: KeyVal<any> = {}) {
    this.code = code;
    this.success = code < 300;
    Object.keys(object).forEach(key => {
      this[key] = object[key];
    });
  }
}
