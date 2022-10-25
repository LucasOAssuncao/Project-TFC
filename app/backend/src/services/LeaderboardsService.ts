import Match from '../database/models/matches';
import Team from '../database/models/teams';
import { ITeamScores } from '../interfaces/ILeaderboard';
import { leaderboardsPoints } from '../utils/leaderboards';

export default class LeaderboardsService {
  getHomeLeaderboard = async (key?: 'home' | 'away') => {
    let leaderboard;

    if (key === 'home') {
      leaderboard = await this.getHome();
    }
    if (key === 'away') {
      leaderboard = await this.getAway();
    }
    if (!key) {
      leaderboard = await this.getAll();
    }

    return leaderboard;
  };

  getAway = async () => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({ where: { inProgress: false } });

    const leaderboards = allTeams.map((team: Team) => {
      const away = allMatches.filter((match: Match) => match.awayTeam === team.id);
      return {
        name: team.teamName,
        ...leaderboardsPoints(away as never, team.id),
      };
    });
    return leaderboards;
  };

  getHome = async () => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({
      where: { inProgress: false },
    });

    const leaderboards = allTeams.map((team: Team) => {
      const home = allMatches.filter((match: Match) => match.homeTeam === team.id);
      return {
        name: team.teamName,
        ...leaderboardsPoints(home as never, team.id),
      };
    });
    return leaderboards;
  };

  getAll = async () => {
    const allTeams = await Team.findAll();
    const allMatches = await Match.findAll({
      where: { inProgress: false },
    });

    const leaderboards = allTeams.map((team: Team) => ({
      name: team.teamName,
      ...leaderboardsPoints(allMatches as never, team.id),
    }));
    return leaderboards;
  };

  sortScore = (leaderboards: ITeamScores[]) => {
    const sorted = leaderboards.sort((prev, curr) => {
      let sort = curr.totalPoints - prev.totalPoints;
      if (!sort) sort = curr.totalVictories - prev.totalVictories;
      if (!sort) sort = curr.goalsBalance - prev.goalsBalance;
      if (!sort) sort = curr.goalsFavor - prev.goalsFavor;
      if (!sort) sort = curr.goalsOwn - prev.goalsOwn;
      return sort;
    });

    return sorted;
  };
}
