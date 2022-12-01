export const userMock = {
  id: 3,
  username: 'Teste',
  role: 'user',
  email: 'teste@user.com',
  password: '$2a$08$ywuLtsyUHtY7ixJZvHIp0.RopAzKAY13E.jyl3O.uX0wmrhtyw6Zm'
};

export const teamsMock = [
  { id: 1, teamName: "Avaí/Kindermann" },
  { id: 2, teamName: "Bahia" },
];

export const matchesMock = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Avaí/Kindermann',
    },
    teamAway: {
      teamName: 'Bahia',
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 2,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: 'Bahia',
    },
    teamAway: {
      teamName: 'Avaí/Kindermann',
    }
  },
  {
    id: 3,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Avaí/Kindermann',
    },
    teamAway: {
      teamName: 'Bahia',
    }
  },
];

export const leaderBoardMock = [
  {
    name: "Bahia",
    totalPoints: 4,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 5,
    goalsOwn: 2,
    goalsBalance: 3,
    efficiency: 66.67
  },
  {
    name: "Avaí/Kindermann",
    totalPoints: 1,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 5,
    goalsBalance: -3,
    efficiency: 16.67,
  },
];

export const leaderBoardHomeMock = [
  {
    name: "Bahia",
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 2,
    goalsBalance: 0,
    efficiency: 33.33,
  },
  {
    name: "Avaí/Kindermann",
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 3,
    goalsBalance: -3,
    efficiency: 0
  },
];

export const leaderBoardAwayMock = [
  {
    name: "Bahia",
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 0,
    goalsBalance: 3,
    efficiency: 100,
  },
  {
    name: "Avaí/Kindermann",
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 2,
    goalsBalance: 0,
    efficiency: 33.33,
  },
]