const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Consume HEAD Method', () => {
  let response;

  before(async () => {
    response = await axios.head('https://github.com/aperdomob/redirect-test');
  });

  it('should redirect the url', async () => {
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.request.res.responseUrl).to.equal('https://github.com/aperdomob/new-redirect-test');
  });

  it('consume get method and redirect the url', async () => {
    const URLresponse = await axios.get('https://github.com/aperdomob/redirect-test');
    expect(URLresponse.status).to.equal(StatusCodes.OK);
  });
});
