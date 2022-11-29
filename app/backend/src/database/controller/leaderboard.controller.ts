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
  awayTeam?: number,
  awayTeamGoals: number,
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

  public updateTable = (team: ITeams, currentTG: number, opponentTG: number) => {
    const currentTeam = team;
    currentTeam.totalGames += 1;
    currentTeam.goalsFavor += currentTG;
    currentTeam.goalsOwn += opponentTG;
    if (currentTG > opponentTG) {
      currentTeam.totalPoints += 3;
      currentTeam.totalVictories += 1;
    } else if (opponentTG > currentTG) {
      currentTeam.totalLosses += 1;
    } else {
      currentTeam.totalPoints += 1;
      currentTeam.totalDraws += 1;
    }
    return currentTeam;
  };

  public verifyTeam = async (
    result: ITeams[],
    { homeTeam, homeTeamGoals, awayTeamGoals }: IMatch,
  ) => {
    const current = await this.teamService.getById(homeTeam);
    if (!current) return null;
    let currentIndex = result.findIndex((team: ITeams) => team.name === current.teamName);
    if (currentIndex === -1) {
      result.push(this.newTeam(current.teamName));
      currentIndex = result.length - 1;
    }
    const team = this.updateTable(result[currentIndex], homeTeamGoals, awayTeamGoals);
    return { team, currentIndex };
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
    // const homeMatches = matches.map((match) => match.homeTeam);
    const result:ITeams[] = [];
    matches.forEach(async ({ homeTeam, homeTeamGoals, awayTeamGoals }) => {
      const current = await this.teamService.getById(homeTeam);
      if (!current) return null;
      let currentIndex = result.findIndex((team: ITeams) => team.name === current.teamName);
      if (currentIndex === -1) {
        result.push(this.newTeam(current.teamName));
        currentIndex = result.length - 1;
      }
      const team = this.updateTable(result[currentIndex], homeTeamGoals, awayTeamGoals);
      result[currentIndex] = team;
      /* if (homeMatches.includes(awayTeam)) {
        const newOpponent = await this
          .verifyTeam(result, { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals });
        if (newOpponent) result[newOpponent.currentIndex] = newOpponent.team;
      } */
    });
    const newResult = this.getEfficiency(result);
    return res.status(200).json(newResult);
  };

  public getAway = async (_req: Request, res: Response) => {
    const matches = await this.matchController.getMatchesInProgress();
    const awayMatches = matches.map((match) => match.awayTeam);
    const result:ITeams[] = [];
    matches.forEach(async ({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
      const newCurrent = await this.verifyTeam(result, { homeTeam, homeTeamGoals, awayTeamGoals });
      if (newCurrent) result[newCurrent.currentIndex] = newCurrent.team;
      if (awayMatches.includes(awayTeam)) {
        const newOpponent = await this
          .verifyTeam(result, { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals });
        if (newOpponent) result[newOpponent.currentIndex] = newOpponent.team;
      }
    });
    const newResult = this.getEfficiency(result);
    return res.status(200).json(newResult);
  };
}

export default LeaderBoardController;
