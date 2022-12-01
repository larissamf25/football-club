import MatchController from '../controller/match.controller';
import IMatch, { ITeams } from '../interfaces';
import TeamService from './team.service';

class LeaderBoardService {
  matches: IMatch[] = [];
  result: ITeams[] = [];

  constructor(
    private matchController = new MatchController(),
    private teamService = new TeamService(),
  ) {}

  public newTeam = (teamName: string) => ({
    name: teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  });

  public createTable = async () => {
    this.matches = await this.matchController.getMatchesNotInProgress();
    const teams = await this.teamService.getTeams();
    this.result = [];
    teams.forEach((team) => {
      this.result.push(this.newTeam(team.teamName));
    });
  };

  public winner = (winnerIdx:number, winnerGoals: number, loserGoals:number) => {
    this.result[winnerIdx].totalPoints += 3;
    this.result[winnerIdx].totalGames += 1;
    this.result[winnerIdx].totalVictories += 1;
    this.result[winnerIdx].goalsFavor += winnerGoals;
    this.result[winnerIdx].goalsOwn += loserGoals;
  };

  public loser = (loserIdx:number, loserGoals: number, winnerGoals:number) => {
    this.result[loserIdx].totalGames += 1;
    this.result[loserIdx].totalLosses += 1;
    this.result[loserIdx].goalsFavor += loserGoals;
    this.result[loserIdx].goalsOwn += winnerGoals;
  };

  public draw = (team:number, goals: number) => {
    this.result[team].totalPoints += 1;
    this.result[team].totalGames += 1;
    this.result[team].totalDraws += 1;
    this.result[team].goalsFavor += goals;
    this.result[team].goalsOwn += goals;
  };

  public populateTable = () => {
    this.matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      if (!teamHome || !teamAway) return null;
      const { teamName: homeTeam } = teamHome;
      const { teamName: awayTeam } = teamAway;
      const homeIdx = this.result.findIndex((team) => team.name === homeTeam);
      const awayIdx = this.result.findIndex((team) => team.name === awayTeam);
      if (homeTeamGoals > awayTeamGoals) {
        this.winner(homeIdx, homeTeamGoals, awayTeamGoals);
        this.loser(awayIdx, awayTeamGoals, homeTeamGoals);
      } else if (awayTeamGoals > homeTeamGoals) {
        this.winner(awayIdx, awayTeamGoals, homeTeamGoals);
        this.loser(homeIdx, homeTeamGoals, awayTeamGoals);
      } else {
        this.draw(homeIdx, homeTeamGoals);
        this.draw(awayIdx, awayTeamGoals);
      }
    });
  };

  public getEfficiency = () => {
    this.result = this.result.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: Math.round((10000 * (team.totalPoints / team.totalGames / 3))) / 100,
    }))
      .sort((a, b) => b.goalsFavor - a.goalsFavor)
      .sort((a, b) => b.goalsBalance - a.goalsBalance)
      .sort((a, b) => b.totalPoints - a.totalPoints);
  };

  public getHome = async () => {
    await this.createTable();
    this.matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      if (!teamHome || !teamAway) return null;
      const { teamName: homeTeam } = teamHome;
      const homeIdx = this.result.findIndex((team) => team.name === homeTeam);
      if (homeTeamGoals > awayTeamGoals) {
        this.winner(homeIdx, homeTeamGoals, awayTeamGoals);
      } else if (awayTeamGoals > homeTeamGoals) {
        this.loser(homeIdx, homeTeamGoals, awayTeamGoals);
      } else this.draw(homeIdx, homeTeamGoals);
    });
    this.getEfficiency();
    const homeTeams = this.result
      .filter((team) => this.matches.some(({ teamHome }) => teamHome?.teamName === team.name));
    return homeTeams;
  };

  public getAway = async () => {
    await this.createTable();
    this.matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      if (!teamHome || !teamAway) return null;
      const { teamName: awayTeam } = teamAway;
      const awayIdx = this.result.findIndex((team) => team.name === awayTeam);
      if (awayTeamGoals > homeTeamGoals) {
        this.winner(awayIdx, awayTeamGoals, homeTeamGoals);
      } else if (homeTeamGoals > awayTeamGoals) {
        this.loser(awayIdx, awayTeamGoals, homeTeamGoals);
      } else this.draw(awayIdx, awayTeamGoals);
    });
    this.getEfficiency();
    const awayTeams = this.result
      .filter((team) => this.matches.some(({ teamHome }) => teamHome?.teamName === team.name));
    return awayTeams;
  };

  public getLeaderBoardSorted = async () => {
    await this.createTable();
    this.populateTable();
    this.getEfficiency();
    return this.result;
  };
}

export default LeaderBoardService;
