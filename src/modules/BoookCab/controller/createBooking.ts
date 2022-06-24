import { Request, Response } from 'express';
import CabBooking from '../../../models/bookCab';
import getDistanceInKilometer from '../../../helpers/distance';
import Cab from '../../../models/cab';

//function to book cab for user
export default async function createBooking(
  req: Request,
  res: Response
): Promise<Response | void> {
  const pickupAddress = req.body.pickupAddress;
  const dropAddress = req.body.dropAddress;

  //split address in two parts
  const locationA = pickupAddress.coordinates.toString().split(',');
  const locationB = dropAddress.coordinates.toString().split(',');

  //get distance in KM
  const dist = getDistanceInKilometer(
    locationA[0],
    locationA[1],
    locationB[0],
    locationB[1]
  );

  //create price for trip
  const tripPrice = Math.ceil(15 * dist);

  //for 10miles
  const radius = 10 / 3963.2;

  //get nearby cabs
  const cabs: any = await Cab.find({
    booked: false,
    loc: {
      $geoWithin: {
        $centerSphere: [[locationA[0], locationA[1]], radius],
      },
    },
  });

  //check if cabs are available
  if (cabs.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'no cabs available at your destination',
    });
  }
  console.log(req.user);
  //create cab booking
  const cabBooking = new CabBooking({
    pickupAddress,
    dropAddress,
    tripPrice,
    bookingConfirm: true,
    createdBy: req.user.id,
    cab: cabs[0]._id,
  });

  //update cab as booked = true
  await Cab.findByIdAndUpdate(cabs[0]._id, { booked: true });
  //save cab booking
  await cabBooking.save();
  //send response to user
  res.status(200).json({
    status: 'success',
    message: 'Cab booking is successfull',
    data: cabBooking,
  });
}
