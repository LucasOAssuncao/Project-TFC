import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private service = new UserService()) { }

  public getRole = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    const token = authorization.replace('Bearer ', '');
    const role = this.service.getRole(token as string);

    return res.status(200).json(role);
  };
}
