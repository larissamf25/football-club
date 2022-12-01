import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { compareSync } from 'bcryptjs';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this.userService.getUser(email);
    if (!user || !compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1d', algorithm: 'HS256',
    });
    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.getUser(email);
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    return res.status(200).json({ role: user.role });
  };
}

export default UserController;
