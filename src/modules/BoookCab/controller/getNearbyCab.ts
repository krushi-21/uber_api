import { Request, Response } from 'express';
import Cab from '../../../models/cab';

export default async function getNearbyCab(
  req: Request,
  res: Response
): Promise<Response | void> {
  const { lat, long } = req.body;
  if (!lat || !long) {
    return res.status(400).json({
      status: 'fail',
      message: 'please provide latitude and longitude',
    });
  }

  //10miles
  const radius = 10 / 3963.2;
  console.log(lat);
  console.log(long);
  console.log(req.body);
  const cabs = await Cab.find({
    booked: false,
    loc: {
      $geoWithin: {
        $centerSphere: [[lat, long], radius],
      },
    },
  });

  if (cabs.length === 0) {
    return res.status(200).json({
      status: 'fail',
      message: 'no cabs available at your destination',
    });
  }
  return res.status(200).json({
    status: 'succes',
    data: cabs,
  });
}
