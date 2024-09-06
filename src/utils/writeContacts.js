import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { getAllContacts } from '../scripts/getAllContacts.js';

export const writeContacts = async (updatedContacts) => {
  try {
    const currentContacts = await getAllContacts();
    currentContacts.push(...updatedContacts);
    const data = JSON.stringify(currentContacts, null, 2);

    await fs.writeFile(PATH_DB, data, 'utf8');
    console.log('Data successfully written to file!');
  } catch (error) {
    console.log('Error writing to file: ', error);
  }
};
