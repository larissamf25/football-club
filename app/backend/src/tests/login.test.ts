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

describe('Verify login route', () => {
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

  it('should return 400 when missing email or passowrd', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "teste@user.com"});

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body.message).to.be('All fields must be filled');
  });

  it('should return 401 when passing incorrects email or password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "teste@user.com", password: "123"});

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be('Incorrect email or password');
  });
  it('should return the token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "teste@user.com", password: "testando123"});

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body.token).to.be.string;
  });
});
