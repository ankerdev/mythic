import * as jwt from 'jsonwebtoken';
import { CONFIG } from '../../config';
import { JWTClaims } from './jwt.enums';
import { IJWTPayload } from './jwt.interfaces';

class JWTService {
  create(payload: object): string | null {
    try {
      return jwt.sign(payload, CONFIG.jwt.secret, CONFIG.jwt.options)
    } catch (e) {
      return null;
    }
  }

  decode(token: string): IJWTPayload | null {
    try {
      return jwt.decode(token) as IJWTPayload | null;
    } catch (e) {
      return null;
    }
  }

  verify(token: string): IJWTPayload | null {
    try {
      return jwt.verify(token, CONFIG.jwt.secret) as IJWTPayload | null;
    } catch (e) {
      return null;
    }
  }

  refresh(payload: IJWTPayload): string | null {
    if (payload) {
      Object.values(JWTClaims).forEach((i: JWTClaims) => { delete payload[i] });
      return this.create(payload);
    }
    return null;
  }
}

export const jwtService = new JWTService();
