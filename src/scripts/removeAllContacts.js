import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const removeAllContacts = async () => {
  try {
    const remove = '[]';
    await fs.writeFile(PATH_DB, remove, 'utf8');
    console.log('All contacts have been deleted.');
  } catch (error) {
    console.log('Error deleting contacts:', error);
  }
};

removeAllContacts();
