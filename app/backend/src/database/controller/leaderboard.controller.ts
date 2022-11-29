import { Request, Response } from 'express';
import LeaderBoard from '../services/leaderBoard.service';

class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoard()) {}

  public getHome = async (_req: Request, res: Response) => {
    const matches = await this.leaderBoardService.getMatches();
    return res.status(200).json(matches);
  };

  public getAway = async (_req: Request, res: Response) => {
    const matches = await this.leaderBoardService.getMatches();
    return res.status(200).json(matches);
  };
}

export default LeaderBoardController;
