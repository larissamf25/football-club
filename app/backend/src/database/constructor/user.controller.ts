import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = (req: Request, res: Response) => {
    const { email } = req.body;
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1d', algorithm: 'HS256',
    });
    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const role = await this.userService.getRole(email, password);
    if (!role) return res.status(404).json({ message: 'Email not found' });
    return res.status(200).json({ role });
  };
}

export default UserController;
