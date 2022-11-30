import MatchModel from '../models/Matches';
import TeamModel from '../models/Teams';

interface IMatch {
  id?: number,
  inProgress?: boolean,
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }

}

class MatchService {
  private role = '';

  async getMatches():Promise<IMatch[]> {
    console.log(this.role);
    const matches = await MatchModel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return matches;
  }

  async getById(id: number) {
    console.log(this.role);
    const match = await MatchModel.findByPk(id);
    return match;
  }

  async createMatch(body: IMatch) {
    console.log(this.role);
    const newMatch = await MatchModel.create({ ...body, inProgress: true });
    return newMatch;
  }

  async endMatch(id: number) {
    console.log(this.role);
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    console.log(this.role);
    const [updated] = await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  }
}

export default MatchService;
