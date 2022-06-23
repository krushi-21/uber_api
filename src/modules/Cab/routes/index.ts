import { Router } from 'express';
//import getAllCabRequset from '../controller/getAllReq';
import registerCab from '../controller/registerCab';
import { catchAsync } from '../../../helpers/catchAsync';
//configure express router
const router = Router();

//adding all routes

//router.get('/getAllCabRequest', catchAsync(getAllCabRequset));
router.post('/registerCab', catchAsync(registerCab));

export const cabOwnerRouter = router;
