import { Request, Response, NextFunction } from 'express';
import { CONFIG } from '../../config';
import { User } from '../../models';
import { retrieveTokenFromHeaders } from '../utils';
import { jwtService } from './jwt.service';

class JWTMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    if (this.isUnauthenticatedOperation(res.locals.queryData.operationName)) {
      return next();
    }

    let token = retrieveTokenFromHeaders(req);
    if (token) {
      const payload = jwtService.verify(token);
      if (payload) {
        const user = await User.query().findById(payload.id);
        if (user) {
          res.locals.auth = user;
          return next();
        }
      }
    }

    return res
      .status(401)
      .json({ message: 'Unauthenticated' });
  }

  private isUnauthenticatedOperation(operation: string) {
    return Object
      .values(CONFIG.auth.unauthenticatedOperations)
      .flat()
      .some(unauthenticatedOperation => operation === unauthenticatedOperation);
  }
}

export const jwtMiddleware = new JWTMiddleware();
