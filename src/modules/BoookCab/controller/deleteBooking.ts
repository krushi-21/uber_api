import { Request, Response } from 'express';
import CabBooking from '../../../models/bookCab';

//delete booking for user
export default async function deleteBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { bookingId } = req.body;
  const id = await CabBooking.findOne({ _id: bookingId });
  if (!id) {
    return res.status(404).json({
      status: 'fail',
      message: 'booking id is not valid',
    });
  }
  const reqs = await CabBooking.findByIdAndDelete({
    createdBy: req.body.user.id,
    _id: bookingId,
  });

  return res.status(200).json({
    message: 'success',
  });
}
