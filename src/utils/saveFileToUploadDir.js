import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from './env.js';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  const oldWay = path.join(TEMP_UPLOAD_DIR, file.filename);
  const newWay = path.join(UPLOAD_DIR, file.filename);

  await fs.rename(oldWay, newWay);

  return `${env('APP_DOMAIN')}/uploads/${file.filename}`; //If the value of the APP_DOMAIN field changes, you need to change this value in the .env file
};
