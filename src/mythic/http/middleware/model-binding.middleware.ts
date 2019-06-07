import { Request, Response, NextFunction } from 'express';
import { CONFIG } from '../../../config';
import { BaseModel } from '../..';

class ModelBindingMiddleware {
  handle = async (_req: Request, res: Response, next: NextFunction) => {
    const { args, operationName } = res.locals.queryData;
    const id = this.getIdForFields(args);
    if (id) {
      const model = this.getModelForOperationName(operationName);
      if (model) {
        const { modelName } = model;
        const instance = await model.query().findById(id);
        if (instance) {
          res.locals[modelName.toLowerCase()] = instance;
          return next();
        } else {
          return res
            .status(404)
            .json({ message: `${modelName} not found` });
        }
      }
    }
    return next();
  }

  private getIdForFields = (fields: any): string => {
    let id: string = '';
    fields.forEach((field: any) => {
      if (id) { return; }
      switch (field.name.value) {
        case 'id':
          id = field.value.value;
          break;

        case 'input':
          if (field.value.fields) {
            const val = this.getIdForFields(field.value.fields);
            if (val) { id = val; }
            break;
          }
      }
    });
    return id;
  }

  private getModelForOperationName = (operationName: string): typeof BaseModel | undefined => {
    let model: typeof BaseModel | undefined;
    CONFIG.modelBinding.forEach(modelBindingObject => {
      const { resolvers } = modelBindingObject;
      Object.keys(resolvers).forEach(typeKey => {
        const type = resolvers[typeKey];
        Object.keys(type).forEach(resolverKey => {
          if (operationName === resolverKey) {
            model = modelBindingObject.model;
          }
        });
      });
    });
    return model;
  }
}

export const modelBindingMiddleware = new ModelBindingMiddleware();
