import TeamsModel from '../models/Teams';

class TeamService {
  private role = '';

  async getTeams(): Promise<TeamsModel[]> {
    console.log(this.role);
    const teams = await TeamsModel.findAll();
    return teams;
  }

  async getById(id: number) {
    console.log(this.role);
    const team = await TeamsModel.findOne({ where: { id } });
    return team;
  }
}

export default TeamService;
