import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwtHelpers';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let token;

  const authHeader = req.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        statusCode: 401,
        message: 'unauthorized',
      });
    }
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        statusCode: 401,
        message: 'unauthorized',
      });
    }
    req.user = user;
  }

  return next();
}
