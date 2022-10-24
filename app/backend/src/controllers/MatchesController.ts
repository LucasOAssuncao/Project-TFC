import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  getAll = async (req: Request, res: Response) => {
    const allMatches = await this.matchesService.getAll();
    return res.status(200).json(allMatches);
  };
}
