import express from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  contactSchemaValidation,
  contactUpdateSchemaValidation,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchemaValidation),
  ctrlWrapper(createContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.patch(
  '/contacts/:contactId',
  jsonParser,
  validateBody(contactUpdateSchemaValidation),
  ctrlWrapper(patchContactController),
);

export default router;
