import { Request, Response } from 'express';
import LeaderboardsService from '../services/LeaderboardsService';

export default class LeaderboardsController {
  constructor(private leaderboardsService = new LeaderboardsService()) { }

  getHomeLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardsService.getHomeLeaderboard('home');
    const sorted = this.leaderboardsService.sortScore(leaderboard as never);

    return res.status(200).json(sorted);
  };

  getAwayLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardsService.getHomeLeaderboard('away');
    const sorted = this.leaderboardsService.sortScore(leaderboard as never);

    return res.status(200).json(sorted);
  };

  getLeaderboard = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardsService.getHomeLeaderboard();
    const sorted = this.leaderboardsService.sortScore(leaderboard as never);

    return res.status(200).json(sorted);
  };
}
