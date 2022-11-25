import * as express from 'express';
import { Request, Response } from 'express';
import TeamController from '../controller/team.controller';

export default class TeamRoutes {
  public teamRouter: express.IRouter;
  private teamController: TeamController;

  constructor() {
    this.teamRouter = express.Router();

    this.teamController = new TeamController();

    this.teamRouter.get(
      '/',
      (req: Request, res: Response) => this.teamController.getTeams(req, res),
    );
    this.teamRouter.get(
      '/:id',
      (req: Request, res: Response) => this.teamController.getById(req, res),
    );
  }
}
