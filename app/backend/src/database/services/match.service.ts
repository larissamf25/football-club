import MatchModel from '../models/Matches';

class MatchService {
  private role = '';

  async getMatches() {
    console.log(this.role);
    const matches = await MatchModel.findAll();
    return matches;
  }
}

export default MatchService;
