import * as express from 'express';
import { Request, Response } from 'express';
import LeaderBoardController from '../controller/leaderboard.controller';

export default class LeaderBoardRoutes {
  public leaderBoardRouter: express.IRouter;
  private leaderBoardController: LeaderBoardController;

  constructor() {
    this.leaderBoardRouter = express.Router();

    this.leaderBoardController = new LeaderBoardController();

    this.leaderBoardRouter.get(
      '/',
      (req: Request, res: Response) => this.leaderBoardController.getLeaderBoardSorted(req, res),
    );
    this.leaderBoardRouter.get(
      '/home',
      (req: Request, res: Response) => this.leaderBoardController.getHome(req, res),
    );
    this.leaderBoardRouter.get(
      '/away',
      (req: Request, res: Response) => this.leaderBoardController.getAway(req, res),
    );
  }
}
