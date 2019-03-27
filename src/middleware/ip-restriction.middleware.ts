import { Request, Response, NextFunction } from 'express';
import { CONFIG } from '../config';

class IPRestrictionMiddleware {
  handle = async (req: Request, res: Response, next: NextFunction) => {
    // @TODO https://stackoverflow.com/questions/29411551/express-js-req-ip-is-returning-ffff127-0-0-1
    // -> Convert to ipv4 if applicable
    if (['*', req.ip].some(ip => CONFIG.ipRestriction.trustedIps.includes(ip))) {
      return next();
    }

    return res
      .status(403)
      .json({ message: 'Forbidden' });
  }
}

export const ipRestrictionMiddleware = new IPRestrictionMiddleware();
