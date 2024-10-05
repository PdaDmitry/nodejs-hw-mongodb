import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetPwdSchema,
  sendResetEmailSchema,
} from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  resetPwdController,
  sendResetEmailController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const jsonParser = express.json({
  type: ['application/json', 'application/vnd.api+json'], //!!!!!!!!!!Check!!!!!!!!!
  limit: '100kb',
});

router.post(
  '/auth/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/auth/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/auth/logout', ctrlWrapper(logoutUserController));

router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/auth/send-reset-email',
  jsonParser,
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

router.post(
  '/auth/reset-pwd',
  jsonParser,
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
);

router.get('/auth/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

export default router; //authRouter
