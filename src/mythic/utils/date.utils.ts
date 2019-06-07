import { format } from 'date-fns';

export const toDBFormat = (date: string | number | Date): string => {
  return format(date, 'YYYY-MM-DD HH:mm:ss');
}

export const toISOFormat = (date: string | number | Date): string => {
  return format(date);
}
