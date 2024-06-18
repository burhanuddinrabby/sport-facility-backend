import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const validatedData = await schema.parseAsync({
      body: req.body,
      cookies: req.cookies
    });

    req.body = validatedData.body;

    next();
  });
};

export default validateRequest;
