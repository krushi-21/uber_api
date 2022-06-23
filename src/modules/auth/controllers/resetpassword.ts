import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../../../models/user';
import { createToken } from '../../../helpers/jwtHelpers';

//user can reset password using given link

export async function ResetPasswordWithToken(
  req: Request,
  res: Response
): Promise<Response | void> {
  //decrypt token from user
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  //find user by given token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresIn: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found please register',
    });
  }
  //update the password
  user.password = req.body.newPassword;

  //deleting reset token and expire time
  user.passwordResetToken = undefined;
  user.passwordResetExpiresIn = undefined;
  await user.save();

  //login in user with JWT
  const accessToken = createToken(user._id);
  return res.status(200).json({
    message: 'success',
    accessToken,
  });
}
