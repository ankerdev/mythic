import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { jwtService } from '../services';
import { isUnauthenticatedAction, retrieveTokenFromHeaders } from '../utils';

class JWTMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    if (isUnauthenticatedAction(req.body.query)) {
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
}

export const jwtMiddleware = new JWTMiddleware();
