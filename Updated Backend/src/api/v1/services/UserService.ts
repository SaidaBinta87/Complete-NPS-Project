import { User, IUser } from '../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface LoginResponse {
  userId: string;
  username: string;
  token: string;
}

export class UserService {
  static async register(username: string, password: string): Promise<IUser> {
    const user = new User({ username, password });
    return await user.save();
  }

  static async login(username: string, password: string): Promise<LoginResponse> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  
    return { userId: user._id, username: user.username, token }; // Include userId in the response
  }
}
