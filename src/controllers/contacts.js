import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
} from '../services/contacts.js';

export const getContactsController = async (_req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    // throw createHttpError(404, 'Contact not found.');
    return next(createHttpError(404, 'Contact not found.'));
  } else {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: {
        contact,
      },
    });
  }
};

export const createContactController = async (req, res, next) => {
  // const contactElem = {
  //   name: req.body.name,
  //   phoneNumber: req.body.phoneNumber,
  //   email: req.body.email,
  //   isFavourite: req.body.isFavourite,
  //   contactType: req.body.contactType,
  // };
  // const contact = await createContact(contactElem);

  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: contact,
  });
};
