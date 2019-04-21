import { Request, Response, NextFunction } from 'express';
import { extractDataForQuery } from '../utils';

class GraphQLQueryMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const queryData = extractDataForQuery(req.body.query);
    if (queryData) {
      res.locals.queryData = queryData;
      return next();
    }

    return res
      .status(400)
      .json({ message: 'Bad request' });
  }
}

export const graphqlQueryMiddleware = new GraphQLQueryMiddleware();
