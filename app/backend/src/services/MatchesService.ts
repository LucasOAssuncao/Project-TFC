import Matches from '../database/models/matches';
import Team from '../database/models/teams';
// import { IMatches } from '../interfaces/IMatches';

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
}
