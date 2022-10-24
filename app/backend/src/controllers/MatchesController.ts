import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const filteredMatches = await this.matchesService.getAll({ where: { inProgress: true } });

      return res.status(200).json(filteredMatches);
    }
    const allMatches = await this.matchesService.getAll();

    return res.status(200).json(allMatches);
  };
}
