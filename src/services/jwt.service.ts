import * as jwt from 'jsonwebtoken';
import { CONFIG } from '../config';
import { KeyVal } from '../types';
import { IJWTPayload } from '../interfaces';

// @TODO Implement some form of blacklist

class JWTService {
  private readonly secret: string = CONFIG.jwt.secret;
  private readonly signOptions: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '15m',
  };
  private readonly verifyOptions: jwt.VerifyOptions = {};
  private readonly reservedClaims: string[] = ['iat', 'exp', 'nbf', 'jti']

  create(payload: object): string | null {
    try {
      return jwt.sign(payload, this.secret, this.signOptions)
    } catch (e) {
      return null;
    }
  }

  decode(token: string): string | KeyVal<string> | null {
    try {
      return jwt.decode(token);
    } catch (e) {
      return null;
    }
  }

  verify(token: string): IJWTPayload | null {
    try {
      return jwt.verify(token, this.secret, this.verifyOptions) as IJWTPayload | null;
    } catch (e) {
      switch (e.name) {
        // @TODO These cases could be handled, or the error logged to Sentry, etc.
        case 'TokenExpiredError':
        case 'NotBeforeError':
        case 'JsonWebTokenError':
        default:
          return null;
      }
    }
  }

  // @TODO Replace object type
  refresh(payload: object): string | null {
    if (payload) {
      this.reservedClaims.forEach(i => { delete (<any>payload)[i] });
      return this.create(payload);
    }
    return null;
  }
}

export const jwtService = new JWTService();
