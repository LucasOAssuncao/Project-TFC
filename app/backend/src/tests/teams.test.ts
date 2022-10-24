import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { mockAllTeams, mockTeamById } from './mocks/teams';
import TeamModel from '../database/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endpoint /teams', () => {
  beforeEach(sinon.restore);
  describe('Testando a rota /teams', () => {
      it('retorna um array de times', async () => {
        sinon.stub(TeamModel, 'findAll').resolves(mockAllTeams as TeamModel[]);
    
        const res = await chai.request(app).get('/teams');
    
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.deep.equal(mockAllTeams as TeamModel[]);
      });
  })
  describe('Testando a rota /teams/:id', () => {
    it('retorna um objeto com um time', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(mockTeamById as TeamModel);
  
      const response = await chai.request(app).get('/teams/5');
  
      expect(response.status).to.be.equal(200);
      
      expect(response.body).to.be.deep.equal(mockTeamById as TeamModel);
    });
  });
});

