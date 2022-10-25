import { NextFunction, Request, Response } from 'express';
import decode from '../utils/decode';

const verifyAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });

  try {
    decode(authorization);
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};
export default verifyAuthorization;
