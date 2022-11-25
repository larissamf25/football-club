import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getTeams = async (_req: Request, res: Response) => {
    const teams = await this.teamService.getTeams();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamController;
