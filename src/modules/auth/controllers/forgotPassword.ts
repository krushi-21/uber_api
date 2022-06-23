import { Request, Response } from 'express';
import sendEmail from '../../../helpers/email';
import User from '../../../models/user';

export default async function ForgotPassword(
  req: Request,
  res: Response
): Promise<Response | void> {
  //get user email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      staus: 'fail',
      message: 'User not found please register',
    });
  }
  //create new reset password token
  const resetToken = await user.createPasswordResetToken();
  //save token in DB
  await user.save();
  //create reset url for email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/reset-password/${resetToken}`;
  //message for email
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:${resetUrl}.
  If you didn't forgot your password ,please ignore this email`;
  //send mail
  await sendEmail({
    email: email,
    subject: 'Your password reset token (valid for 10 min)',
    message,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Reset token has sent to your email',
  });
}
