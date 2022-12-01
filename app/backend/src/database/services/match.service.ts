import IMatch from '../interfaces';
import MatchModel from '../models/Matches';
import TeamModel from '../models/Teams';

class MatchService {
  public getMatches = async ():Promise<IMatch[]> => {
    const matches = await MatchModel.findAll({ include: [
      { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
      { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
    ] });
    return matches;
  };

  public getById = async (id: number) => {
    const match = await MatchModel.findByPk(id);
    return match;
  };

  public createMatch = async (body: IMatch) => {
    const newMatch = await MatchModel.create({ ...body, inProgress: true });
    return newMatch;
  };

  public endMatch = async (id: number) => {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const [updated] = await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  };
}

export default MatchService;
