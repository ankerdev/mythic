import { Request, Response, NextFunction } from 'express';

class PolicyMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    const { auth: user } = res.locals;
    if (!user) {
      return next();
    }
    // @TODO How to get policy here?
    return next();
  }
}

export const policyMiddleware = new PolicyMiddleware();
