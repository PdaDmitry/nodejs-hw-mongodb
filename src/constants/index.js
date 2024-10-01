import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
// export const ACCESS_TOKEN_FIFTEEN_MIN = 3 * 60 * 1000; //TEST!!!!!!!!!!!
export const ACCESS_TOKEN_FIFTEEN_MIN = 15 * 60 * 1000; //15 minutes in milliseconds
export const REFRESH_TOKEN_THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};

export const TEMPLATE_DIR = path.resolve('src', 'templates'); //path.resolve() creates an absolute path to the current working directory
//Practically does the same thing
// export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates'); //path.join() simply separates path segments while handling directory separators.
