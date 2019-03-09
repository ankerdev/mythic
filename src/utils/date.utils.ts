import { format } from 'date-fns';

export const toDBFormat = (date: Date): string => {
  return format(date, 'YYYY-MM-DD HH:mm:ss');
}

export const toISOFormat = (date: Date): string => {
  return format(date);
}
