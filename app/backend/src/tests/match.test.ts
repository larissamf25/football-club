import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import App from '../app';
import MatchModel from '../database/models/Matches';
import { matchesMock } from './mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verify match route', () => {
  let chaiHttpResponse: Response;

  it('find all matches', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);

    (MatchModel.findAll as sinon.SinonStub).restore();
  });
  it('end match', async () => {
    sinon
      .stub(MatchModel, "update")
      .resolves();

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });

    (MatchModel.update as sinon.SinonStub).restore();
  });
  it('update match', async () => {
    sinon.stub(MatchModel, "update")
      .resolves([1] as [affectedCount: number]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
      homeTeamGoals: '1',
      awayTeamGoals: '2',
    });

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(1);

    (MatchModel.update as sinon.SinonStub).restore();
  });
});