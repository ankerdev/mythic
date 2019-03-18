import { gql } from 'apollo-server-express';
import { Request, Response, NextFunction } from 'express';
import { CONFIG } from '../config';
import { BaseModel } from '../lib';

class ModelBindingMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const gqlObject = gql`${req.body.query}`;
      const selection = (<any>gqlObject.definitions[0]).selectionSet.selections[0];
      const { name: { value: action }, arguments: args } = selection;
      const id = this.getIdForFields(args);
      const model = this.getModelForAction(action);
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
    } catch (e) {}
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

  private getModelForAction = (action: string): typeof BaseModel | undefined => {
    let model: typeof BaseModel | undefined;
    CONFIG.modelBinding.forEach(modelBindingObject => {
      const { resolvers } = modelBindingObject;
      Object.keys(resolvers).forEach(typeKey => {
        const type = resolvers[typeKey];
        Object.keys(type).forEach(resolverKey => {
          if (action === resolverKey) {
            model = modelBindingObject.model;
          }
        });
      });
    });
    return model;
  }
}

export const modelBindingMiddleware = new ModelBindingMiddleware();
