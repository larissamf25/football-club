import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import UserModel from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verify login/validate route', () => {
  describe('', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves({
          id: 3,
          username: 'Teste',
          role: 'user',
          email: 'teste@user.com',
          password: '$2a$08$ywuLtsyUHtY7ixJZvHIp0.RopAzKAY13E.jyl3O.uX0wmrhtyw6Zm'
        } as UserModel);
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })
    it('should send the wrong token', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0ZSIsImlhdCI6MTY2OTIyNDgyOCwiZXhwIjoxNjY5ODI5NjI4fQ.cdxH1f-RRgYNomeH--e7tIpWr3CMVP7MEG0R3OA2e');

      expect(chaiHttpResponse.status).to.be.equals(401);
      expect(chaiHttpResponse.body.message).to.be.equals('Invalid token');
    });
    it('with no token', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate');

      expect(chaiHttpResponse.status).to.be.equals(401);
      expect(chaiHttpResponse.body.message).to.be.equals('Token not found');
    });
    it('should return the correct role', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0ZSIsImlhdCI6MTY2OTIyNDgyOCwiZXhwIjoxNjY5ODI5NjI4fQ.cdxH1f-RRgYNomeH--e7tIpWr3CMVP7MEG0R3OA2eyw');

      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body.role).to.be.equals('user');
    });
  });
  describe('with wrong email', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);
    });

    after(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })
    it('with worng email', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJUZXN0ZSIsImlhdCI6MTY2OTIyNDgyOCwiZXhwIjoxNjY5ODI5NjI4fQ.cdxH1f-RRgYNomeH--e7tIpWr3CMVP7MEG0R3OA2eyw');

      expect(chaiHttpResponse.status).to.be.equals(404);
      expect(chaiHttpResponse.body.message).to.be.equals('Email not found');
    });
  })
});
