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

export interface ITeams {
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

export default IMatch;
