import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import MatchModel from '../database/models/Matches';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verify match route', () => {
  let chaiHttpResponse: Response;

  it('find all matches', async () => {
    sinon
      .stub(MatchModel, "findAll")
      .resolves([{
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
      }] as MatchModel[]);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([{
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
    }]);

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

    chaiHttpResponse = (await chai.request(app).patch('/matches/1').send({
      homeTeamGoals: '1',
      awayTeamGoals: '2',
    }));

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(1);

    (MatchModel.update as sinon.SinonStub).restore();
  });
  /* it('should create a match', async () => {
    sinon
    .stub(UserModel, "findByPk")
    .resolves({
      id: 2,
      username: 'user@user.com',
      role: 'user',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    } as UserModel);
    sinon
    .stub(MatchModel, "create")
    .resolves({
      id: 45,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    } as MatchModel);

    chaiHttpResponse = await chai.request(app).post('/matches')
      .set({ "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0ZSIsImlhdCI6MTY2OTIyNDgyOCwiZXhwIjoxNjY5ODI5NjI4fQ.cdxH1f-RRgYNomeH--e7tIpWr3CMVP7MEG0R3OA2eyw" })
      .send({
      homeTeam: 16,
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      id: 45,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    });
    (MatchModel.create as sinon.SinonStub).restore();
  }); */
});
