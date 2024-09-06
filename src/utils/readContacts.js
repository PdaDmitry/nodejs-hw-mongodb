import { PATH_DB } from '../constants/contacts.js';

import fs from 'node:fs/promises';

export const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    const contacts = JSON.parse(data);
    // console.log(contacts);
    return contacts;
  } catch (error) {
    console.error('Error reading file:', error);
  }
};
