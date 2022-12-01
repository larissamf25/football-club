import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import UserService from '../services/user.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
    private userService = new UserService(),
  ) {}

  public getMatchesInProgress = async () => {
    const matches = await this.matchService.getMatches();
    return matches.filter((match) => match.inProgress === true);
  };

  public getMatchesNotInProgress = async () => {
    const matches = await this.matchService.getMatches();
    return matches.filter((match) => match.inProgress === false);
  };

  public getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true') return res.status(200).json(await this.getMatchesInProgress());
    if (inProgress === 'false') return res.status(200).json(await this.getMatchesNotInProgress());
    const matches = await this.matchService.getMatches();
    return res.status(200).json(matches);
  };

  public createMatches = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.getUser(email);
    if (!user) return res.status(401).json({ messagae: 'Token must be a valid token' });

    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!await this.matchService.getById(Number(homeTeam))
    || !await this.matchService.getById(Number(awayTeam))) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    const match = await this.matchService.createMatch(req.body);
    return res.status(201).json(match);
  };

  public endMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchService.endMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(200).json(match);
  };
}

export default MatchController;
