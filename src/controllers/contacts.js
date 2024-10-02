import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id, //for authorization
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id); //req.user._id for authorization

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

export const createContactController = async (req, res, _next) => {
  // Add a userId field for authorization
  const contact = await createContact({ ...req.body, userId: req.user._id }); //req.user._id for authorization

  // console.log(req.file); req.files - if an array of files

  const photo = req.file;
  let photoUrl;

  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id); //req.user._id for authorization

  if (!contact) {
    return next(createHttpError(404, 'Contact not found.'));
    // throw createHttpError(404, 'Contact not found.');
  }

  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  const contact = await updateContact(contactId, req.body, req.user._id); //req.user._id for authorization

  if (!contact) {
    return next(createHttpError(404, 'Contact not found.'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};
