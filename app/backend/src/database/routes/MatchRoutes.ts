import * as express from 'express';
import { Request, Response } from 'express';
import MatchController from '../controller/match.controller';

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
  }
}
