import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teams = Router();
const teamsController = new TeamsController();

teams.get('/teams', teamsController.getAll);

teams.get('/teams/:id', teamsController.getById);

export default teams;
