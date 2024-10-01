import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(30).email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().min(3).max(30).email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().min(3).max(30).email().required(),
});

export const resetPwdSchema = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  token: Joi.string().required(),
});
