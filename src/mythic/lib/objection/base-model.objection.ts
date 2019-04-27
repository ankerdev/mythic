import Ajv from 'ajv';
import { UserInputError } from 'apollo-server-core';
import * as objection from 'objection';
import { v4 } from 'uuid';
import { Dates, IConnectionParameters, KeyVal, GraphQLPaginationArray } from '../../../declarations';
import { toDBFormat, toISOFormat } from '../..';
import { SoftDeleteQueryBuilder } from './soft-delete-query-builder.objection';
import { performPaginationForBuilder } from './utils.objection';

// @ts-ignore | @IMPROVEMENT Need to fork objection to make this work properly
export class BaseModel extends objection.Model {
  id!: string;
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string | null;

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
   * Pagination.
   */
  static paginate(connectionParams: IConnectionParameters): Promise<GraphQLPaginationArray<BaseModel>> {
    return performPaginationForBuilder(this.query(), connectionParams);
  }

  paginate(connectionParams: IConnectionParameters, relation: string): Promise<GraphQLPaginationArray<BaseModel>> {
    return performPaginationForBuilder(this.$relatedQuery(relation), connectionParams);
  }

  /**
   * Dates.
   */
  private get now(): string {
    return toDBFormat(new Date());
  }

  private formatDatesOnRetrieval(): void {
    const dateKeys: Dates[] = ['createdAt', 'updatedAt', 'deletedAt'];
    dateKeys.forEach(key => {
      if (this[key]) {
        this[key] = toISOFormat(new Date(this.createdAt));
      }
    });
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
