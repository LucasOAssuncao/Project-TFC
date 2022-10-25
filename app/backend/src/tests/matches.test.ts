import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import {
  mockForAllMatches,
  mockForInProgress,
  mockForNotInProgress,
  MockForCreateMatch,
  MockForEqualTeams,
  MockForInvalidTeam,
} from './mocks/matches';
import { mockRightResponse } from './mocks/login';
import { mockTeamById2, mockTeamById} from './mocks/teams';
import MatchesModel from '../database/models/matches';
import TeamModel from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endpoint /matches', () => {
  beforeEach(sinon.restore);
  describe('Testando a rota /matches', () => {
    it('retorna todas as partidas', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(mockForAllMatches as any);

      const res = await chai.request(app).get('/matches');

      expect(res.body).to.be.deep.equal(mockForAllMatches);
    });
    it('retorna todas as partidas em progresso', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(mockForInProgress as any);

      const res = await chai.request(app).get('/matches?inProgress=true');

      expect(res.body).to.be.deep.equal(mockForInProgress);
    });
    it('retorna todas as partidas que acabaram', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(mockForNotInProgress as any);

      const res = await chai.request(app).get('/matches?inProgress=false');

      expect(res.body).to.be.deep.equal(mockForNotInProgress);
    });
  });

  describe('Testando a rota /matches metodo POST', () => {
    it('retorna a partida criada', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(mockTeamById as any)
      sinon.stub(MatchesModel, 'create').resolves(MockForCreateMatch as any);

      const res = await chai.request(app)
      .post('/matches')
      .send(MockForCreateMatch)
      .set('authorization', mockRightResponse);

      expect(res.body).to.be.deep.equal(MockForCreateMatch)
    });
    // it('retorna a mensagem de token invalido', async () => {
    //   sinon.stub(jwt, 'verify').resolves(false);

    //   const res = await chai.request(app)
    //   .post('/matches')
    //   .send(MockForCreateMatch)
    //   .set('authorization', mockRightResponse);

    //   expect(res.body.message).to.be.deep.equal('Token must be a valid token')
    // });
    it('retorna uma mensagem se os dois times forem iguais', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(mockTeamById as any)
      sinon.stub(MatchesModel, 'create').resolves(MockForCreateMatch as any);

      const res = await chai.request(app)
      .post('/matches')
      .send(MockForEqualTeams)
      .set('authorization', mockRightResponse);
  
      expect(res.body.message).to.be.deep.equal('It is not possible to create a match with two equal teams')
    });
    it('retorna uma mensagem se nao achar um time', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(null)
  
      const res = await chai.request(app)
      .post('/matches')
      .send(MockForInvalidTeam)
      .set('authorization', mockRightResponse);
  
      expect(res.body.message).to.be.deep.equal('There is no team with such id!')
    });
  });
  describe('testando a rota matches/:id', () => {
    it('retorna uma mensagem ao finalizar uma partida', async () => {
      sinon.stub(MatchesModel, 'update');
  
      const res = await chai.request(app)
      .patch('/matches/5/finish')
  
      expect(res.body.message).to.be.deep.equal('Finished')
    });
  })
});
