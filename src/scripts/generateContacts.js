import { createFakeContact } from '../utils/createFakeContact.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  let newContacts = [];
  try {
    for (let i = 0; i < number; i++) {
      const createdContact = createFakeContact();
      newContacts.push(createdContact);
    }
    // console.log(newContacts);
    writeContacts(newContacts);
    return newContacts;
  } catch (error) {
    console.log('Error creating new contacts:', error);
  }
};

generateContacts(5);
