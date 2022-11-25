import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from './database/controller/user.controller';
import validateLogin, { validateToken } from './database/middlewares/validations';

class App {
  public app: express.Express;
  private userController: UserController;

  constructor() {
    this.app = express();

    this.config();
    this.userController = new UserController();
    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.get(
      '/login/validate',
      (req: Request, res: Response, next: NextFunction) => validateToken(req, res, next),
      (req: Request, res: Response) => this.userController.getRole(req, res),
    );
    this.app.post(
      '/login',
      (req: Request, res: Response, next: NextFunction) => validateLogin(req, res, next),
      (req: Request, res: Response) => this.userController.login(req, res),
    );
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
