import { env } from 'env';

export interface IIPRestrictionConfig {
  trustedIps: string[];
}

export const ipRestriction: IIPRestrictionConfig = {
  trustedIps: env('TRUSTED_IPS', '*').replace(/\s/, '').split(','),
};
