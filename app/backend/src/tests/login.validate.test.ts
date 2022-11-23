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
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "findOne")
      .resolves({
        id: 3,
        username: 'Teste',
        role: 'user',
        email: 'teste@user.com',
        password: 'testando123'
      } as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })
  it('should return the role', async () => {
    chaiHttpResponse = await chai.request(app).post('/login/validate').send({email: "teste@user.com", password: "testando123"});

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body.role).to.be.equals('user');
  });
});
