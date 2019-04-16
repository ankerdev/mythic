import { getenv } from '../mythic';

export interface IIPRestrictionConfig {
  trustedIps: string[];
}

export const ipRestriction: IIPRestrictionConfig = {
  trustedIps: getenv('TRUSTED_IPS', '*').replace(/\s/, '').split(','),
};
