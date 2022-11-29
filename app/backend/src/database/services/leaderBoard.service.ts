import MatchModel from '../models/Matches';

class LeaderBoardService {
  private role = '';

  async getMatches() {
    console.log(this.role);
    const matches = await MatchModel.findAll();
    return matches;
  }
}

export default LeaderBoardService;
