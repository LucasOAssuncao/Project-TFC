import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const boolean = inProgress === 'true';
      const filteredMatches = await this.matchesService.getAll({ where: { inProgress: boolean } });

      return res.status(200).json(filteredMatches);
    }
    const allMatches = await this.matchesService.getAll();

    return res.status(200).json(allMatches);
  };

  insert = async (req: Request, res: Response) => {
    const match = req.body;
    const { homeTeam, awayTeam } = match;

    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const matchInserted = await this.matchesService.insert(match);

    return res.status(201).json(matchInserted);
  };

  endStatus = async (req: Request, res: Response) => {
    const { id } = req.params;

    const endedMatch = await this.matchesService.endStatus(id);

    return res.status(200).json(endedMatch);
  };
}
