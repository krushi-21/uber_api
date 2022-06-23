import { Request, Response } from 'express';
import CabBooking from '../../../models/bookCab';

//get all past booking for users

export default async function checkPastBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const page: number = (req.query.page as any) * 1 || 1;
  const limit: number = (req.query.limit as any) * 1 || 100;
  const skip = (page - 1) * limit;

  const userId = req.body.user.id;
  console.log(skip);
  console.log(limit);
  const reqs = await CabBooking.find({ createdBy: userId })
    .skip(skip)
    .limit(limit);
  return res.status(200).json({
    status: 'success',
    data: reqs,
  });
}
