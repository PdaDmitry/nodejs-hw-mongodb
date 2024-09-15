import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, _res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    throw createHttpError(400, 'Your ID is invalid!');
  }
  next();
};
