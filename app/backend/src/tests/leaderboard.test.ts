import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Matches';
import TeamModel from '../database/models/Teams';
import { Response } from 'superagent';
import { leaderBoardAwayMock, leaderBoardHomeMock, leaderBoardMock, matchesMock, teamsMock } from './mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verify learderboard route', () => {
  let chaiHttpResponse: Response;

  it('get leader board complete', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsMock as TeamModel[]);
    sinon
    .stub(MatchModel, "findAll")
    .resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardMock);

    (TeamModel.findAll as sinon.SinonStub).restore();
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  it('get leader board complete by home', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsMock as TeamModel[]);
    sinon
    .stub(MatchModel, "findAll")
    .resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardHomeMock);

    (TeamModel.findAll as sinon.SinonStub).restore();
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  it('get leader board complete by away', async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves(teamsMock as TeamModel[]);
    sinon
    .stub(MatchModel, "findAll")
    .resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardAwayMock);

    (TeamModel.findAll as sinon.SinonStub).restore();
    (MatchModel.findAll as sinon.SinonStub).restore();
  });
});