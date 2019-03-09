require('dotenv').config();

export const getenv = (key: string, fallback?: any): any => {
  const value: string = key in process.env
    ? process.env[key]
    : fallback || '';

  // Handle numerical value
  const valueAsNum = parseInt(value, 10);
  if (isFinite(valueAsNum) && valueAsNum > 0) {
    return valueAsNum;
  }

  return value;
}
