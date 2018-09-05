import sinon from 'sinon';
import faker from 'faker';
import { makeRequest } from './makeRequest.js';

const mockFetch = response => () => Promise.resolve(response);

const mockFetchError = error => () => Promise.reject(error);

const mockFetchReturningParams = (url, params) => Promise.resolve({
  ok: true,
  json() { return { url, params }; },
});

const fakeUrl = faker.internet.url();
const fakeUserName = faker.internet.userName();

describe('makeRequest', () => {
  it('Should return a promise when no extra parameters are passed.', () => {
    expect(makeRequest(fakeUrl)).to.be.a('promise');
  });

  it('Should have a default error handler that just returns the response ' +
    'as an error if response.ok is not true.', (done) => {
    const forcedErrorResponse = {
      ok: false,
    };

    makeRequest(fakeUrl, {}, {}, mockFetch(forcedErrorResponse))
      .catch((response) => {
        expect(response).to.equal(forcedErrorResponse);
        expect(response.ok).not.to.be.true;
        done();
      });
  });

  it('Should have a default response parser that runs the json() ' +
    'method of the response.', (done) => {
    const successResponse = {
      ok: true,
      json: sinon.spy(),
    };

    makeRequest(fakeUrl, {}, {}, mockFetch(successResponse))
      .then(() => {
        expect(successResponse.json.called);
        done();
      });
  });

  it('Should have a default body parser that converts the body content ' +
    'to json.', (done) => {
    const body = { name: fakeUserName };
    const expectedBody = JSON.stringify(body);

    makeRequest(fakeUrl, { body }, {}, mockFetchReturningParams)
      .then((response) => {
        expect(response.params.body).to.equal(expectedBody);
        done();
      });
  });

  it('Should use the url passed as parameter to make the request.', (done) => {
    makeRequest(fakeUrl, {}, {}, mockFetchReturningParams)
      .then((response) => {
        expect(response.url).to.equal(fakeUrl);
        done();
      });
  });

  it('Should throw an error if the request cannot be made.', (done) => {
    const expectedError = new Error('expectedError');

    makeRequest(fakeUrl, {}, {}, mockFetchError(expectedError))
      .catch((error) => {
        expect(error).to.equal(expectedError);
        done();
      });
  });

  it('Should accept a custom status checker.', (done) => {
    const successResponse = {
      statusCode: 200,
      json: sinon.spy(),
    };

    const statusChecker = response => (response.statusCode < 400);

    makeRequest(fakeUrl, {}, { statusChecker }, mockFetch(successResponse))
      .then(() => {
        expect(successResponse.json.called);
        done();
      });
  });

  it('Should accept a custom response parser.', (done) => {
    const successResponse = {
      ok: true,
      xml: sinon.spy(),
    };

    const responseParser = response => response.xml();

    makeRequest(fakeUrl, {}, { responseParser }, mockFetch(successResponse))
      .then(() => {
        expect(successResponse.xml.called);
        done();
      });
  });

  it('Should accept a custom body parser.', (done) => {
    const body = { name: fakeUserName };
    const expectedBody = fakeUserName;

    const bodyParser = payload => payload.name;

    makeRequest(fakeUrl, { body }, { bodyParser }, mockFetchReturningParams)
      .then((response) => {
        expect(response.params.body).to.equal(expectedBody);
        done();
      });
  });

  it('Should accept a custom error handler.', (done) => {
    const originalError = new Error('404');
    const expectedError = 'Error code 404';

    const errorHandler = err => `Error code ${err.message}`;

    makeRequest(fakeUrl, {}, { errorHandler }, mockFetchError(originalError))
      .catch((error) => {
        expect(error).to.equal(expectedError);
        done();
      });
  });
});
