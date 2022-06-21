import { Request, Response, NextFunction } from 'express';
import User from '../../../models/user';
import { createToken } from '../../../helpers/jwtHelpers';

export default async function Register(
  req: Request,
  res: Response
): Promise<Response | void> {
  //get user data
  const { email, password, role } = req.body;
  //check user is already exist or not
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: 'fail',
      message: 'User already register with this email',
    });
  }

  //save user in Database
  const newUser = await User.create({
    email,
    password,
    role,
  });
  //send error if user is not created
  if (!newUser)
    return res.status(404).json({
      status: 'fail',
      message: 'Something went wrong please try again',
    });

  //generate new token for user
  const accessToken = createToken(newUser._id);
  return res.status(200).json({
    status: 'success',
    accessToken,
  });
}
