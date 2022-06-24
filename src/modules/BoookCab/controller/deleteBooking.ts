import { Request, Response } from 'express';
import CabBooking from '../../../models/bookCab';

//delete booking for user
export default async function deleteBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  console.log(req.params);
  const { id } = req.params;
  const _id = await CabBooking.findOne({ _id: id });
  if (!_id) {
    return res.status(404).json({
      status: 'fail',
      message: 'booking id is not valid',
    });
  }
  const reqs = await CabBooking.findByIdAndDelete({
    createdBy: req.user.id,
    _id: id,
  });

  return res.status(200).json({
    message: 'success',
  });
}
