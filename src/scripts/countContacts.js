import { getAllContacts } from './getAllContacts.js';

export const countContacts = async () => {
  try {
    const currentCountContacts = await getAllContacts();

    return currentCountContacts.length;
  } catch (error) {
    console.log(error);
  }
};

console.log(await countContacts());
