import * as objection from 'objection';
import { toDBFormat } from '../..';
import { BaseModel } from './base-model.objection';

// @IMPROVEMENT Fork objection to add typings to added functions, such as restore() and withTrashed()
export class SoftDeleteQueryBuilder extends objection.Model.QueryBuilder<BaseModel> {
  deletedAtAttr: string = 'deleted_at';

  constructor(modelClass: typeof BaseModel) {
    // @ts-ignore | @READ objection.js' typings doesn't allow QueryBuilder's constructor to pass model class
    super(modelClass);
    if (this.baseModelClass.softDeletes) {
      this.onBuild((q: SoftDeleteQueryBuilder) => {
        if (q.isFind() && !q.context().withTrashed) {
          q.whereNull(`${this.baseModelClass.tableName}.${this.deletedAtAttr}`);
        }
        return q;
      });
    }
  }

  withTrashed(): this {
    return this.mergeContext({ withTrashed: true });
  }

  delete(): objection.QueryBuilderYieldingCount<BaseModel, BaseModel[]> {
    return this.baseModelClass.softDeletes
      ? super.patch({ [this.deletedAtAttr]: toDBFormat(new Date()) })
      : super.delete();
  }

  forceDelete(): objection.QueryBuilderYieldingCount<BaseModel, BaseModel[]> {
    return super.delete();
  }

  restore(): objection.QueryBuilderYieldingCount<BaseModel, BaseModel[]> {
    if (this.baseModelClass.softDeletes) {
      this.mergeContext({ restore: true });
      return super.patch({ [this.deletedAtAttr]: null });
    }
    return super.patch({}); // @TODO Is this necesarry?
  }

  get baseModelClass() {
    return <unknown>this.modelClass() as typeof BaseModel;
  }
}
