import path from 'node:path';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import { User } from '../db/models/user.js';
import createHttpError from 'http-errors';
import {
  ACCESS_TOKEN_FIFTEEN_MIN,
  REFRESH_TOKEN_THIRTY_DAYS,
  SMTP,
  TEMPLATE_DIR,
} from '../constants/index.js';
import { Session } from '../db/models/session.js';
import { sendEmail } from '../utils/sendMail.js';

import { env } from '../utils/env.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10); //Hashing passwords

  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};

//Template for creating a new session
const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_FIFTEEN_MIN),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_THIRTY_DAYS),
  };
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password); //Comparing password hashes

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const sendResetEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const resetToken = jwt.sign(
    {
      sub: user._id, //identification
      email: user.email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m', //Password reset expiration date!!!!!!!!!!!!!!!!!!!
    },
  );
  // console.log({ resetToken });

  const templateFilePath = path.join(TEMPLATE_DIR, 'reset-password-email.html');

  const templateSource = (await fs.readFile(templateFilePath)).toString(); //{encoding:"utf-8"}

  const template = handlebars.compile(templateSource); //Compiling the HTML file "reset-password-email.html"

  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env(SMTP.FROM),
      to: email,
      subject: 'Reset your password', //Title of the message that arrives in the mail
      html,
    });
  } catch (error) {
    console.log(error);

    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPwd = async (payload) => {
  let jWToken;

  try {
    jWToken = jwt.verify(payload.token, env('JWT_SECRET')); //token verification
  } catch (error) {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await User.findOne({
    email: jWToken.email,
    _id: jWToken.sub,
  });

  if (!user) throw createHttpError(404, 'User not found!');

  const newEncryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne({ _id: user._id }, { password: newEncryptedPassword });

  await Session.deleteOne({ userId: user._id });
};
