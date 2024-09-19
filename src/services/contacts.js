import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  //Skips a number of elements before starting to render to the current page
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = ContactsCollection.find();
  // const contactsCount = await ContactsCollection.find()
  //   .merge(contactsQuery)
  //   .countDocuments();
  // const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  // due to the use of the contactsQuery parameter in both queries - the order is important!
  // Because contactsQuery uses.skip() and.limit() to change the state of the request object!
  // When countDocuments() is run in parallel, it receives a modified query (with pagination applied),
  // so it only counts the number of documents on the current page(taking into account.skip() and.limit()).
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
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
