import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId, //for authorization
}) => {
  const limit = perPage;
  //Skips a number of elements before starting to render to the current page
  const skip = page > 0 ? (page - 1) * perPage : 0;

  console.log(filter);

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite !== null) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactsQuery.where('userId').equals(userId); //for authorization

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

  if (page > paginationData.totalPages) {
    throw createHttpError(404, 'Items not found');
  }

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
  return contact;
};
