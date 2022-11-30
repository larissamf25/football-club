import { Request, Response } from 'express';
// import LeaderBoard from '../services/leaderBoard.service';
import MatchController from './match.controller';
import TeamService from '../services/team.service';

interface ITeams {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance?: number,
  efficiency?: number,
}

interface IMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  teamHome?: {
    teamName: string,
  },
  teamAway?: {
    teamName: string,
  }
}

class LeaderBoardController {
  constructor(
    // private leaderBoardService = new LeaderBoard(),
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

  /* public createTable = async (teamType: string) => {
    const matches = await this.matchController.getMatchesInProgress();
    const teams = await this.teamService.getTeams();
    const result:ITeams[] = [];
    teams.forEach((team) => {
      if (teamType === 'home' && matches.some((match) => match.homeTeam === team.id)) {
        result.push(this.newTeam(team.teamName));
      } else if (teamType === 'away' && matches.some((match) => match.awayTeam === team.id)) {
        console.log('oi');
        result.push(this.newTeam(team.teamName));
      }
    });
    return { result, matches };
  }; */

  public winner = (winner:ITeams, winnerGoals: number, loser:ITeams, loserGoals: number) => {
    const newWinner = winner;
    newWinner.totalPoints += 3;
    newWinner.totalGames += 1;
    newWinner.totalVictories += 1;
    newWinner.goalsFavor += winnerGoals;
    newWinner.goalsOwn += loserGoals;
    const newLoser = loser;
    newLoser.totalGames += 1;
    newLoser.totalLosses += 1;
    newLoser.goalsFavor += loserGoals;
    newLoser.goalsOwn += winnerGoals;
    return [newWinner, newLoser];
  };

  public tie = (winner:ITeams, winnerGoals: number, loser:ITeams, loserGoals: number) => {
    const firstTeam = winner;
    firstTeam.totalPoints += 1;
    firstTeam.totalGames += 1;
    firstTeam.totalDraws += 1;
    firstTeam.goalsFavor += winnerGoals;
    firstTeam.goalsOwn += loserGoals;
    const secondTeam = loser;
    secondTeam.totalPoints += 1;
    secondTeam.totalGames += 1;
    secondTeam.totalDraws += 1;
    secondTeam.goalsFavor += winnerGoals;
    secondTeam.goalsOwn += loserGoals;
    return [firstTeam, secondTeam];
  };

  public populateTable = (result:ITeams[], matches:IMatch[]) => {
    const tList:ITeams[] = result;
    matches.forEach(({ homeTeamGoals, awayTeamGoals, teamHome, teamAway }) => {
      if (!teamHome || !teamAway) return null;
      const { teamName: homeTeam } = teamHome;
      const { teamName: awayTeam } = teamAway;
      const homeIdx = tList.findIndex((team) => team.name === homeTeam);
      const awayIdx = tList.findIndex((team) => team.name === awayTeam);
      let home:ITeams;
      let away:ITeams;
      if (homeTeamGoals > awayTeamGoals) {
        [home, away] = this.winner(tList[homeIdx], homeTeamGoals, tList[awayIdx], awayTeamGoals);
      } else if (awayTeamGoals > homeTeamGoals) {
        [away, home] = this.winner(tList[awayIdx], awayTeamGoals, tList[homeIdx], homeTeamGoals);
      } else [away, home] = this.tie(tList[homeIdx], homeTeamGoals, tList[awayIdx], awayTeamGoals);
      tList[homeIdx] = home;
      tList[awayIdx] = away;
    });
    return tList;
  };

  public getEfficiency = (result: ITeams[]) => {
    const newResult = result.map((team) => ({
      ...team,
      goalsBalance: team.goalsFavor - team.goalsOwn,
      efficiency: team.totalPoints / team.totalGames / 3,
    }));
    return newResult;
  };

  public getHome = async (_req: Request, res: Response) => {
    const matches = await this.matchController.getMatchesInProgress();
    const teams = await this.teamService.getTeams();
    const result:ITeams[] = [];
    teams.forEach((team) => {
      if (matches.some((match) => match.homeTeam === team.id)) {
        result.push(this.newTeam(team.teamName));
      }
    });
    const teamsList = this.populateTable(result, matches);
    if (!teamsList) return res.status(404).json({ message: 'Erro' });
    return res.status(200).json(this.getEfficiency(teamsList));
  };

  public getAway = async (_req: Request, res: Response) => {
    const matches = await this.matchController.getMatchesInProgress();
    const teams = await this.teamService.getTeams();
    const result:ITeams[] = [];
    teams.forEach((team) => {
      if (matches.some((match) => match.awayTeam === team.id)) {
        result.push(this.newTeam(team.teamName));
      }
    });
    const teamsList = this.populateTable(result, matches);
    if (!teamsList) return res.status(404).json({ message: 'Erro' });
    return res.status(200).json(this.getEfficiency(teamsList));
  };
}

export default LeaderBoardController;
