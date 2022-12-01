import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/Users';

import { Response } from 'superagent';
import { userMock } from './mocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verify login/validate route', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves(userMock as UserModel);
  });

  afterEach(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
  it('should send the wrong token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0ZSIsImlhdCI6MTY2OTIyNDgyOCwiZXhwIjoxNjY5ODI5NjI4fQ.cdxH1f-RRgYNomeH--e7tIpWr3CMVP7MEG0R3OA2e');

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Token must be a valid token');
  });
  it('with no token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate');

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Token not found');
  });
});