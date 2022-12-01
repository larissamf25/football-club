import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/Teams';

import { Response } from 'superagent';
import { teamsMock } from './mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verify teams route', () => {
    let chaiHttpResponse: Response;
    it('should return all teams', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock);
      (TeamModel.findAll as sinon.SinonStub).restore();
    });
    it('should return a team by id', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(teamsMock[0] as TeamModel);
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0]);

      (TeamModel.findOne as sinon.SinonStub).restore();
    });
});