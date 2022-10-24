import { Request, Response } from 'express';
import TeamModel from '../database/models/teams';

class TeamsController {
  getAll = async (req: Request, res: Response) => {
    const allTeams = await TeamModel.findAll();

    return res.status(200).json(allTeams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await TeamModel.findOne({ where: { id } });

    return res.status(200).json(team);
  };
}

export default TeamsController;
