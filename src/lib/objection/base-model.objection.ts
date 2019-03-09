import * as objection from 'objection';
import { v4 } from 'uuid';
import { toDBFormat, toISOFormat } from '../../utils';
import { SoftDeleteQueryBuilder } from './soft-delete-query-builder.objection';

// @ts-ignore | @IMPROVEMENT Need to fork objection to make this work properly
export class BaseModel extends objection.Model {
  id!: string;
  created_at!: string;
  updated_at!: string;
  deleted_at!: string;

  static softDeletes: boolean = true;

  // @IMPROVEMENT Use override when merged [https://github.com/Microsoft/TypeScript/issues/2000]
  static QueryBuilder: SoftDeleteQueryBuilder = <unknown>SoftDeleteQueryBuilder as SoftDeleteQueryBuilder;

  get now(): string {
    return toDBFormat(new Date());
  }

  formatDatesOnRetrieval(): void {
    this.created_at = toISOFormat(new Date(this.created_at));
    this.updated_at = toISOFormat(new Date(this.updated_at));
    this.deleted_at = toISOFormat(new Date(this.deleted_at));
  }

  /**
   * Hooks.
   *
   * @return {void}
   */
  $beforeInsert(): Promise<any> | void {
    this.id = v4();
    this.created_at = this.updated_at = this.now;
  }

  $beforeUpdate(): Promise<any> | void {
    this.updated_at = this.now;
  }

  $afterInsert(): Promise<any> | void {
    this.formatDatesOnRetrieval();
  }

  $afterGet(): Promise<any> | void {
    this.formatDatesOnRetrieval();
  }
}
