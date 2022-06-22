import { Router } from 'express';
import { authRouter } from './auth/routes';
import { cabOwnerRouter } from './Cab/routes/index';

const router = Router();

router.use('/auth', authRouter);
router.use('/cab', cabOwnerRouter);

export const AppRoutes = router;
