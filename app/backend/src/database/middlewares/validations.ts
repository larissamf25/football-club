import Joi = require('joi');
import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

type TypeRequest = {
  email: string,
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const data = jwt.verify(token, JWT_SECRET as string) as TypeRequest;
    req.body.email = data.email;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
};

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const { error } = Joi.object({
    email: Joi.string().email()
      .messages({
        'string.email': 'Incorrect email or password',
      }),
    password: Joi.string().min(6).messages({
      'string.min': 'Incorrect email or password',
    }),
  }).validate(req.body);
  if (error) return res.status(401).json({ message: error.message });

  return next();
}
