import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10); //Hashing passwords

  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};
