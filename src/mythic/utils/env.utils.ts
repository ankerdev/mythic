require('dotenv').config();

export const getenv = (key: string, fallback?: any): any => {
  const value: string = key in process.env
    ? process.env[key]
    : fallback || '';

  // Handle numerical value
  if (/^(\d+(\.\d+)?)$/.test(value)) {
    return value.includes('.')
      ? parseFloat(value)
      : parseInt(value, 10);
  }

  // Handle boolean
  switch (value) {
    case 'true': return true;
    case 'false': return false;
  }

  return value;
}
