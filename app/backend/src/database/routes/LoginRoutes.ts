import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controller/user.controller';
import validateLogin, { validateToken } from '../middlewares/validations';

export default class LoginRoutes {
  public loginRouter: express.IRouter;
  private userController: UserController;

  constructor() {
    this.loginRouter = express.Router();

    this.userController = new UserController();

    this.loginRouter.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => validateLogin(req, res, next),
      (req: Request, res: Response) => this.userController.login(req, res),
    );
    this.loginRouter.get(
      '/validate',
      (req: Request, res: Response, next: NextFunction) => validateToken(req, res, next),
      (req: Request, res: Response) => this.userController.getRole(req, res),
    );
  }
}
