require('dotenv').config();

export const getenv = (key: string, fallback?: any): any => {
  const value: string = key in process.env
    ? process.env[key]
    : fallback || '';

  // @TODO Test if it contains alpha char,
  // If it does, don't convert to number

  // Handle numerical value
  const valueAsNum = parseInt(value, 10);
  if (isFinite(valueAsNum) && valueAsNum > 0) {
    return valueAsNum;
  }

  // Handle boolean
  switch (value) {
    case 'true': return true;
    case 'false': return false;
  }

  return value;
}
