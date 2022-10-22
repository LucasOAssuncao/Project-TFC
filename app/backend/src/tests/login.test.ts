import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import UserService from '../services/UserService';
import {
  mockForFindOne,
  mockForValid,
  mockForInvalidPassword,
  mockForInvalidEmail,
  mockWithoutEmail,
  mockRightResponse,
} from './mocks/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o endpoint /login', () => {
  beforeEach(sinon.restore);
  describe('testando a rota /login com POST', () => {
    it('Retorna uma mensagem de password ou email invalido caso o password esteja errado', async () => {
      sinon.stub(User, 'findOne').resolves(mockForFindOne as User);
      sinon.stub(bcrypt, 'compare').resolves(false);

      const res = await chai
        .request(app)
        .post('/login')
        .send(mockForInvalidPassword);

      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.deep.equal('Incorrect email or password');
    });
    it('Retorna uma mensagem de password ou email invalido caso o email esteja errado', async () => {
      sinon.stub(User, 'findOne').resolves(null);

      const res = await chai
        .request(app)
        .post('/login')
        .send(mockForInvalidEmail);

      expect(res.status).to.be.equal(401);
      expect(res.body.message).to.be.deep.equal('Incorrect email or password');
    });
    it('Retorna uma mensagem de necessidade de peenchimento de campos caso user nao exista', async () => {

      const res = await chai
        .request(app)
        .post('/login')
        .send(mockWithoutEmail);

      expect(res.status).to.be.equal(400);
      expect(res.body.message).to.be.deep.equal('All fields must be filled');
    });
    it('Retorna um token valido', async () => {
      sinon.stub(User, 'findOne').resolves(mockForFindOne as User);
      sinon.stub(jwt, 'sign').resolves(mockRightResponse);
      sinon.stub(bcrypt, 'compare').resolves(true);

      const res = await chai
        .request(app)
        .post('/login')
        .send(mockForValid);

      expect(res.status).to.be.equal(200);
      expect(res.body).to.haveOwnProperty('token');
    });
  })

  describe('testando a rota /login/validate com GET', () => {
    it('Retorna uma mensagem quando nao tiver authorization no header', async () => {
      const validateResponse = await chai.request(app).get('/login/validate');

      expect(validateResponse.status).to.be.equal(401);
      expect(validateResponse.body.message).to.be.deep.equal('unauthorized');
    });
    it('Retorna a role do usuario', async () => {
      const userService = new UserService();

      sinon.stub(User, 'findOne').resolves(mockForFindOne as User);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(userService, 'getRole').resolves({ role: 'admin' });

      const res = await chai
        .request(app)
        .post('/login')
        .send(mockForValid);

      const token = res.body.token;

      const validateToken = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', token);

      expect(validateToken.status).to.be.equal(200);
      expect(validateToken.body.role).to.be.equal('admin');
    });
  })
});
