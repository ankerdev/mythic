import { JsonSchema } from 'objection';

interface IJsonSchema extends JsonSchema {
  format?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
}

export const createStringType = (minLength: number, maxLength: number): IJsonSchema => ({
  minLength,
  maxLength,
  type: 'string',
});

export const stringType: IJsonSchema = {
  minLength: 1,
  maxLength: 255,
  type: 'string',
};

export const uuidType: IJsonSchema = {
  format: 'uuid',
  type: 'string',
};

export const uuidPkType: IJsonSchema = {
  ...uuidType,
  readOnly: true,
};
