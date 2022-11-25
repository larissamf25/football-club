import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import TeamModel from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('integration tests for /teams/:id route', () => {
  /* describe('all teams', () => {
    let chaiHttpResponse: Response;
    const teamMock =
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      };

    beforeEach(async () => {
      sinon.stub(TeamModel, 'findAll').resolves([teamMock] as TeamModel);
    });

    afterEach(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    })

    it('should return all teams', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.equals([teamMock]);
    });
  }) */
  describe('team by id', () => {
    let chaiHttpResponse: Response;
    const teamMock =
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      };

    beforeEach(async () => {
      sinon.stub(TeamModel, 'findOne').resolves(teamMock as TeamModel);
    });

    afterEach(()=>{
      (TeamModel.findOne as sinon.SinonStub).restore();
    })

    it('should return a team by id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(teamMock);
    });
  })
});