import TeamsModel from '../models/Teams';

class TeamService {
  public getTeams = async (): Promise<TeamsModel[]> => {
    const teams = await TeamsModel.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const team = await TeamsModel.findOne({ where: { id } });
    return team;
  };
}

export default TeamService;
