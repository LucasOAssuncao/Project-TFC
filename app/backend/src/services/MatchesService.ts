import Matches from '../database/models/matches';
import Team from '../database/models/teams';
import { IGoals } from '../interfaces/IGoals';

type IParam<T> = {
  [key: string]: T;
};

export default class MatchesService {
  getAll = async <T>(param?: IParam<T>): Promise<Matches[] | []> => {
    const allMatches = Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      ...param,
    });

    return allMatches;
  };

  insert = async (match: Matches): Promise<Matches> => {
    const inserted = await Matches.create({
      ...match,
      inProgress: true,
    });

    return inserted;
  };

  endStatus = async (id: string): Promise<{ message: string }> => {
    await Matches.update({ inProgress: false }, { where: { id } });

    return { message: 'Finished' };
  };

  findById = async (id: number): Promise<Matches | null> => {
    const finded = await Matches.findOne({
      where: { id },
    });

    return finded;
  };

  update = async (id: number, goals: IGoals): Promise<Matches | null> => {
    const { homeTeamGoals, awayTeamGoals } = goals;

    await Matches.update({ awayTeamGoals, homeTeamGoals }, { where: { id } });

    const updated = await this.findById(id);

    return updated;
  };
}
