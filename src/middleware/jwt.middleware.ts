import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { jwtService } from '../services';
import { retrieveTokenFromHeaders } from '../utils';

// @TODO Implement excemptions, (for auth and __schema endpoints)

class JWTMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    return next();

    // if (isExemptQuery(req.body.query)) {
    //   return next();
    // }

    // let token = retrieveTokenFromHeaders(req);

    // if (token) {
    //   const payload = jwtService.verify(token);
    //   if (payload) {
    //     const user = await User.query().findById(payload.user_id);
    //     if (user) {
    //       res.locals.user = user;
    //       return next();
    //     }
    //   }
    // }

    // return res
    //   .status(401)
    //   .json({ message: 'Unauthenticated' });
  }
}

export const jwtMiddleware = new JWTMiddleware();
