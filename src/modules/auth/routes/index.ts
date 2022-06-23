import { Router } from 'express';

import Register from '../controllers/register';
import Login from '../controllers/login';
import { ResetPasswordWithToken } from '../controllers/resetpassword';
import ForgotPassword from '../controllers/forgotPassword';
import { catchAsync } from '../../../helpers/catchAsync';

//configure express router
const router = Router();

//adding all routes
router.post('/register', catchAsync(Register));
router.post('/login', catchAsync(Login));
router.post('/reset-password/:token', catchAsync(ResetPasswordWithToken));
router.post('/forgot-password', catchAsync(ForgotPassword));

export const authRouter = router;
