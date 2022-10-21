import { NextFunction, Request, Response } from 'express';
import { compare } from 'bcryptjs';
import UserService from '../services/UserService';
import createToken from '../utils/createToken';

const service = new UserService();

async function authenticate(request: Request, response: Response, next: NextFunction) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'All fields must be filled' });
  }

  const user = await service.findByEmail(email);

  if (!user) return response.status(401).json({ message: 'Incorrect email or password' });

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    return response.status(401).json({ message: 'Incorrect email or password' });
  }

  const payload = { role: user.role, email: user.email };
  const token = createToken(payload);
  response.status(200).json({ token });
  next();
}

export default authenticate;
