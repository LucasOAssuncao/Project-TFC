import { IMatch } from '../interfaces/IMatch';

export const playedGames = (matches: IMatch[], teamId: number) => {
  const games = matches.reduce((acc, cur) => {
    if (cur.awayTeam === teamId || cur.homeTeam === teamId) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return games;
};

export const verifyLosses = (matches: IMatch[], teamId: number) => {
  const losses = matches.reduce((acc, cur) => {
    if (
      cur.awayTeam === teamId
      && cur.awayTeamGoals < cur.homeTeamGoals
    ) {
      return acc + 1;
    }
    if (
      cur.homeTeam === teamId
      && cur.homeTeamGoals < cur.awayTeamGoals
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return losses;
};

export const wins = (matches: IMatch[], teamId: number) => {
  const victories = matches.reduce((acc, cur) => {
    if (
      cur.awayTeam === teamId
      && cur.awayTeamGoals > cur.homeTeamGoals
    ) {
      return acc + 1;
    }
    if (
      cur.homeTeam === teamId
      && cur.homeTeamGoals > cur.awayTeamGoals
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return victories;
};

export const draws = (matches: IMatch[], teamId: number) => {
  const calculateDraws = matches.reduce((acc, cur) => {
    if (
      cur.awayTeam === teamId
      && cur.awayTeamGoals === cur.homeTeamGoals
    ) {
      return acc + 1;
    }
    if (
      cur.homeTeam === teamId
      && cur.homeTeamGoals === cur.awayTeamGoals
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return calculateDraws;
};

export const verifyWinrate = (matches: IMatch[], teamId: number): string => {
  const victories = wins(matches, teamId);
  const teamDraws = draws(matches, teamId);
  const points = victories * 3 + teamDraws * 1;

  const numberOfGames = playedGames(matches, teamId);

  const winrate = (points / (numberOfGames * 3)) * 100;
  return winrate.toFixed(2);
};

export const verifyGoals = (matches: IMatch[], teamId: number) => {
  const goals = matches.reduce((acc, cur) => {
    if (cur.homeTeam === teamId) return acc + cur.homeTeamGoals;
    if (cur.awayTeam === teamId) return acc + cur.awayTeamGoals;
    return acc;
  }, 0);

  const opponentGoals = matches.reduce((acc, cur) => {
    if (cur.homeTeam === teamId) return acc + cur.awayTeamGoals;
    if (cur.awayTeam === teamId) return acc + cur.homeTeamGoals;
    return acc;
  }, 0);

  return { goals, opponentGoals };
};

export const verifyGoalsRate = (matches: IMatch[], teamId: number) => {
  const { goals, opponentGoals } = verifyGoals(matches, teamId);
  return goals - opponentGoals;
};

export const leaderboardsPoints = (matches: IMatch[], teamId: number) => {
  const allGames = playedGames(matches, teamId);
  const allLosses = verifyLosses(matches, teamId);
  const allVictories = wins(matches, teamId);
  const allDraws = draws(matches, teamId);
  const { goals, opponentGoals } = verifyGoals(matches, teamId);
  const goalsRate = verifyGoalsRate(matches, teamId);
  const winrate = verifyWinrate(matches, teamId);

  return ({
    totalPoints: allVictories * 3 + allDraws * 1,
    totalGames: allGames,
    totalVictories: allVictories,
    totalDraws: allDraws,
    totalLosses: allLosses,
    goalsFavor: goals,
    goalsOwn: opponentGoals,
    goalsBalance: goalsRate,
    efficiency: winrate,
  });
};
