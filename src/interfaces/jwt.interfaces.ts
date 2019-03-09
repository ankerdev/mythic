import { JWTClaims } from '../enums';

export interface IJWTPayload {
  id: string;
  [JWTClaims.IAT]: string;
  [JWTClaims.EXP]: string;
  [JWTClaims.NBF]: string;
  [JWTClaims.JTI]: string;
}
