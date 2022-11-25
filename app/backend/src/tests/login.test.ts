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
        password: '$2a$08$ywuLtsyUHtY7ixJZvHIp0.RopAzKAY13E.jyl3O.uX0wmrhtyw6Zm'
      } as UserModel);
  });

  after(()=>{
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('should return 400 when missing email or passowrd', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({ email: "teste@user.com" });

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body.message).to.be.equals('All fields must be filled');
  });

  it('should return 401 when passing incorrect email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "testeuser.com", password: "$2a$08$ywuLtsyUHtY7ixJZvHIp0.RopAzKAY13E.jyl3O.uX0wmrhtyw6Zm"});

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Incorrect email or password');
  });
  it('should return 401 when passing incorrect password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "teste@user.com", password: "password123"});

    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body.message).to.be.equals('Incorrect email or password');
  });
  it('should return the token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({email: "teste@user.com", password: "testando123"});

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body.token).to.be.string;
  });
});
