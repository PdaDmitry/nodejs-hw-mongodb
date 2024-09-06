import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { getAllContacts } from './getAllContacts.js';

export const removeLastContact = async () => {
  try {
    const currentContacts = await getAllContacts();
    currentContacts.pop();
    const data = JSON.stringify(currentContacts, null, 2); // Convert the updated array back to a JSON string

    await fs.writeFile(PATH_DB, data, 'utf8'); // Write the updated data back to the contacts file
    console.log('The last contact was successfully deleted.');
  } catch (error) {
    console.log('Error removing last contact:', error);
  }
};

removeLastContact();
