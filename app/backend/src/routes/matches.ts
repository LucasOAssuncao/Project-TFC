import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import verifyAuthorization from '../middlewares/verifyAuthorization';

const matches = Router();

const matchesController = new MatchesController();

matches.patch('/matches/:id/finish', matchesController.endStatus);
matches.get('/matches', matchesController.getAll);
matches.post('/matches', verifyAuthorization, matchesController.insert);

export default matches;
