import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import MatchController from '../controller/match.controller';
import { validateToken } from '../middlewares/validations';

export default class TeamRoutes {
  public matchRouter: express.IRouter;
  private matchController: MatchController;

  constructor() {
    this.matchRouter = express.Router();
    this.matchController = new MatchController();
    this.matchRouter.get(
      '/',
      (req: Request, res: Response) => this.matchController.getMatches(req, res),
    );
    this.matchRouter.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => validateToken(req, res, next),
      (req: Request, res: Response) => this.matchController.createMatches(req, res),
    );
    this.matchRouter.patch('/:id/finish', (req: Request, res: Response) => (
      this.matchController.endMatch(req, res)
    ));
    this.matchRouter.patch(
      '/:id',
      (req: Request, res: Response) => this.matchController.updateMatch(req, res),
    );
  }
}
