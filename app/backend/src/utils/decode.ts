import { verify } from 'jsonwebtoken';
import { IJWT } from '../interfaces/IJwt';

const verifyJWT = (token: string) => {
  const { payload } = verify(token, process.env.JWT_SECRET as string) as IJWT;
  return payload;
};

export default verifyJWT;
