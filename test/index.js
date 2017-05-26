/* eslint-env node, mocha */

const app = require('../src/app');
const request = require('supertest');

describe('app', () => {
  it('GET /config/ios/266 retrieve message for non-existing entry', (done) => {
    request(app)
        .get('/config/ios/266')
        .expect(304, done);
  });
  it('POST /config should return bad request if no valid request passed', (done) => {
    request(app)
    .post('/config')
    .expect(400, done);
  });
  it('POST /config should change / create configuration', (done) => {
    request(app)
    .post('/config')
    .send({ client: 'ios', version: '267', key: 'ads_endpoint', value: '/devads' })
    .expect(201, done);
  });

  it('GET /config/ios/267 retrieve message', (done) => {
    request(app)
      .get('/config/ios/267')
      .expect(200, { ads_endpoint: '/devads' }, done);
  });

  it('POST /config should change / create configuration', (done) => {
    request(app)
    .post('/config')
    .send({ client: 'ios', version: '267', key: 'ep_endpoint', value: '/devep' })
    .expect(201, done);
  });

  it('GET /config/ios/267 retrieve message', (done) => {
    request(app)
    .get('/config/ios/267')
    .expect(200, { ads_endpoint: '/devads', ep_endpoint: '/devep' }, done);
  });

  it('GET /config/ios/267 retrieve message with If-None-Match header', (done) => {
    request(app)
      .get('/config/ios/267')
      .set('If-None-Match', 'W/"1"')
      .expect(200, { ep_endpoint: '/devep' }, done);
  });


  it('POST /config should change / create configuration', (done) => {
    request(app)
      .post('/config')
      .send({ client: 'ios', version: '267', key: 'ep_endpoint', value: '/devep2' })
      .expect(201, done);
  });

  it('GET /config/ios/267 retrieve message after changes in config', (done) => {
    request(app)
        .get('/config/ios/267')
        .expect(200, { ads_endpoint: '/devads', ep_endpoint: '/devep2' }, done);
  });

  it('GET /config/ios/267 retrieve message with If-None-Match header', (done) => {
    request(app)
      .get('/config/ios/267')
      .set('If-None-Match', 'W/"3"')
      .expect(304, done);
  });

  it('GET /config/ios/266 retrieve message for non-existing entry', (done) => {
    request(app)
        .get('/config/ios/266')
        .expect(304, done);
  });
});
