import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(private matchService = new MatchService()) {}

  public getMatches = async (_req: Request, res: Response) => {
    const matches = await this.matchService.getMatches();
    return res.status(200).json(matches);
  };
}

export default MatchController;
