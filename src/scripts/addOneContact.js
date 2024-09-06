import { writeContacts } from '../utils/writeContacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

export const addOneContact = async () => {
  try {
    const oneContact = [createFakeContact()];
    writeContacts(oneContact);

    return oneContact;
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
};

addOneContact();
