import { ModelOptions } from 'objection';

export interface IModelOptions extends ModelOptions {
  old?: any;
}
