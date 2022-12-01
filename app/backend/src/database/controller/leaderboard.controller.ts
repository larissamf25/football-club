import { Request, Response } from 'express';
import LeaderBoard from '../services/leaderBoard.service';

class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoard(),
  ) {}

  public getHome = async (_req: Request, res: Response) => {
    const homeTeams = await this.leaderBoardService.getHome();
    return res.status(200).json(homeTeams);
  };

  public getAway = async (_req: Request, res: Response) => {
    const awayTeams = await this.leaderBoardService.getAway();
    return res.status(200).json(awayTeams);
  };

  public getLeaderBoardSorted = async (_req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getLeaderBoardSorted();
    return res.status(200).json(allTeams);
  };
}

export default LeaderBoardController;
