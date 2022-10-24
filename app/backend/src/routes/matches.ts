import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matches = Router();

const matchesController = new MatchesController();

matches.get('/matches', matchesController.getAll);

export default matches;
