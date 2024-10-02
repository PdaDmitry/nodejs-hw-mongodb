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
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();
// router.use(authenticate); We add it individually for each route because
//the auth and contacts routes are connected globally via the mainRouter!!!!!!!
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/contacts', authenticate, ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/contacts',
  authenticate,
  upload.single('photo'),
  jsonParser,
  validateBody(contactSchemaValidation),
  ctrlWrapper(createContactController),
);

router.delete(
  '/contacts/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/contacts/:contactId',
  authenticate,
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(contactUpdateSchemaValidation),
  ctrlWrapper(patchContactController),
);

export default router; //contactsRouter
