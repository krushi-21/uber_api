import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

//creating JWT token for user
export const createToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
  } catch (error) {}
  return null;
};
