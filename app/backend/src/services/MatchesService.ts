import Matches from '../database/models/matches';
import Team from '../database/models/teams';
// import { IMatches } from '../interfaces/IMatches';

export default class MatchesService {
  getAll = async (): Promise<Matches[] | []> => {
    const allMatches = Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return allMatches;
  };
}
