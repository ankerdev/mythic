import Ajv from 'ajv';
import { UserInputError } from 'apollo-server-core';
import * as objection from 'objection';
import { v4 } from 'uuid';
import { IConnectionParameters, KeyVal } from '../../../declarations';
import { toDBFormat, toISOFormat } from '../..';
import { SoftDeleteQueryBuilder } from './soft-delete-query-builder.objection';

// @TODO This file needs cleanup
// @ts-ignore | @IMPROVEMENT Need to fork objection to make this work properly
export class BaseModel extends objection.Model {
  id!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string;

  static softDeletes: boolean = true;

  static modelName: string;

  // @IMPROVEMENT Use override when merged [https://github.com/Microsoft/TypeScript/issues/2000]
  static QueryBuilder: SoftDeleteQueryBuilder = <unknown>SoftDeleteQueryBuilder as SoftDeleteQueryBuilder;

  static get updateJsonSchema() {
    return {
      ...this.jsonSchema,
      required: ['id'],
    };
  }

  static async paginate(connectionParams: IConnectionParameters): Promise<BaseModel[]> {
    let {
      first,
      last,
      before,
      after,
    } = connectionParams;

    // @TODO Finish this

    // Check for parameter errors
    if (first && last) {
      throw new UserInputError('Cannot use both first and last parameter');
    } else if (before && after) {
      throw new UserInputError('Cannot use both before and after parameter');
    }

    let query = this.query();

    // @TODO Build query based on parameters

    // @TODO Sort by cursor, if it exists
    // query = query.where('createdAt', '>', toDBFormat(atob(before)));

    return await query;
  }

  /**
   * Validation.
   */
  static performValidation(jsonSchema: objection.JsonSchema, input: KeyVal<any>): void {
    // @TODO Add ability to write { "unique": true } in jsonSchema and have db query fields value
    const ajv = new Ajv({ allErrors: true });
    const valid = ajv.validate(jsonSchema, input);
    if (!valid) {
      throw new UserInputError('Validation failed');
    }
  }

  static validate(input: KeyVal<any>): void {
    this.performValidation(this.jsonSchema, input);
  }

  static validateUpdate(input: KeyVal<any>): void {
    this.performValidation(this.updateJsonSchema, input);
  }

  /**
   * Dates.
   */
  private get now(): string {
    return toDBFormat(new Date());
  }

  private formatDatesOnRetrieval(): void {
    this.createdAt = toISOFormat(new Date(this.createdAt));
    this.updatedAt = toISOFormat(new Date(this.updatedAt));
    this.deletedAt = toISOFormat(new Date(this.deletedAt));
  }

  /**
   * Lifecycle.
   *
   * @return {Promise<any> | void}
   */
  $afterGet(): Promise<any> | void {
    this.formatDatesOnRetrieval();
  }

  $afterInsert(): Promise<any> | void {
    this.formatDatesOnRetrieval();
  }

  $beforeInsert(): Promise<any> | void {
    this.id = v4();
    this.createdAt = this.updatedAt = this.now;
  }

  $beforeUpdate(): Promise<any> | void {
    this.updatedAt = this.now;
  }
}
