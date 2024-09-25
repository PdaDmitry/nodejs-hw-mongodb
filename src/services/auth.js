import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import {
  ACCESS_TOKEN_FIFTEEN_MIN,
  REFRESH_TOKEN_THIRTY_DAYS,
} from '../constants/index.js';
import { Session } from '../db/models/session.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10); //Hashing passwords

  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password); //Comparing password hashes

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await Session.deleteMany({ userId: user._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
