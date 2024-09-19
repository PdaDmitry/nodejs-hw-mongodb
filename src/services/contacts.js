import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  //Skips a number of elements before starting to render to the current page
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = contactsQuery.skip(skip).limit(limit).exec();

  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true },
  );
  return contact;
};
