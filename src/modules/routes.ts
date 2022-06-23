import { Router } from 'express';
import { authRouter } from './auth/routes';
import { cabOwnerRouter } from './Cab/routes/index';
import { cabBookingRouter } from './BoookCab/routes/index';

const router = Router();

router.use('/auth', authRouter);
router.use('/cab', cabOwnerRouter);
router.use('/cabRequset', cabBookingRouter);

export const AppRoutes = router;
