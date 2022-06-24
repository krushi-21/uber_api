import { Request, Response } from 'express';
import Cab from '../../../models/cab';

export default async function updateCabSatus(
  req: Request,
  res: Response
): Promise<Response | void> {
  const id = req.user.id;
  const cab = await Cab.findOneAndUpdate(
    { id, booked: true },
    {
      booked: false,
    }
  );
  if (!cab) {
    return res.status(404).json({
      status: 'fail',
      message: 'Cab not available please register',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: cab,
  });
}
