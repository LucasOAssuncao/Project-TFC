import User from '../database/models/user';
import decode from '../utils/decode';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  findByEmail = async (email: string): Promise<IUser | null> => {
    const result = await User.findOne({ where: { email } });
    return result;
  };

  getRole = (token: string) => {
    const { role } = decode(token);

    return { role };
  };
}
