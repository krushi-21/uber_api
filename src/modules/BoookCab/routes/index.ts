import { Router } from 'express';
import authMiddleware from '../../../middlewares/authMiddleware';
import createBooking from '../controller/createBooking';
import deleteBooking from '../controller/deleteBooking';
import getNearbyCab from '../controller/getNearbyCab';
import checkPastBooking from '../controller/pastBooking';
import { catchAsync } from '../../../helpers/catchAsync';
//configure express router
const router = Router();

//adding all routes
router.post('/createBooking', authMiddleware, catchAsync(createBooking));
router.delete('/deleteBooking/:id', authMiddleware, catchAsync(deleteBooking));
router.get('/pastBooking', authMiddleware, catchAsync(checkPastBooking));
router.get('/getNearbyCab', authMiddleware, catchAsync(getNearbyCab));

export const cabBookingRouter = router;
