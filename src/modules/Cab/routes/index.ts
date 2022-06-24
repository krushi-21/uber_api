import { Router } from 'express';
//import getAllCabRequset from '../controller/getAllReq';
import registerCab from '../controller/registerCab';
import updateCabSatus from '../controller/updateStatus';
import { catchAsync } from '../../../helpers/catchAsync';
import authMiddleware from '../../../middlewares/authMiddleware';
//configure express router
const router = Router();

//adding all routes

//router.get('/getAllCabRequest', catchAsync(getAllCabRequset));
router.post('/registerCab', catchAsync(registerCab));
router.patch('/updateStatus', authMiddleware, catchAsync(updateCabSatus));

export const cabOwnerRouter = router;
