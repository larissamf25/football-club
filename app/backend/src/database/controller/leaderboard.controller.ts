import { Request, Response } from 'express';
// import LeaderBoard from '../services/leaderBoard.service';
import MatchController from './match.controller';

class LeaderBoardController {
  constructor(
    // private leaderBoardService = new LeaderBoard(),
    private matchController = new MatchController(),
  ) {}

  public getHome = async (_req: Request, res: Response) => {
    const matches = await this.matchController.getMatchesInProgress();
    return res.status(200).json(matches);
  };

  public getAway = async (_req: Request, res: Response) => {
    const matches = await this.matchController.getMatchesInProgress();
    return res.status(200).json(matches);
  };
}

export default LeaderBoardController;
