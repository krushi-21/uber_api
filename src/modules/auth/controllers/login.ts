import { createToken } from '../../../helpers/jwtHelpers';
import { Request, Response } from 'express';
import User from '../../../models/user';

export default async function Login(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { email, password } = req.body;
  //check if user exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).end({
      status: 'fail',
      message: 'User not found please register',
    });
  }
  //check password is matching
  if (await user.isValidPassword(password)) {
    //assign new JWT token
    const accessToken = createToken(user._id);
    return res.status(200).json({
      status: 'success',
      accessToken,
    });
  } else {
    return res.status(400).json({
      status: 'fail',
      message: 'user credentials not matching',
    });
  }
}
