import createHttpError from 'http-errors';

export const validateBody = (schemaJoi) => async (req, _res, next) => {
  try {
    await schemaJoi.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(createHttpError(400, error.message));
    return;
  }
};
