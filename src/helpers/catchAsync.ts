import { NextFunction, Request, Response } from 'express';

export function catchAsync(controller: CallableFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: 'Internal Server Error.', data: [] });
    }
  };
}
