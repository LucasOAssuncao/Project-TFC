import { Router } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';

const leaderboardsRoutes = Router();

const leaderboardsController = new LeaderboardsController();

leaderboardsRoutes.get('/leaderboard/home', leaderboardsController.getHomeLeaderboard);
leaderboardsRoutes.get('/leaderboard/away', leaderboardsController.getAwayLeaderboard);

export default leaderboardsRoutes;
