const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Using query parameters', () => {
  let defaultListResponse;
  let tenListResponse;
  let oneHundredListResponse;

  before(async () => {
    defaultListResponse = await axios.get('https://api.github.com/users', {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('should get default list', async () => {
    expect(defaultListResponse.status).to.equal(StatusCodes.OK);
    expect(defaultListResponse.data.length).to.equal(30);
  });

  before(async () => {
    tenListResponse = await axios.get('https://api.github.com/users', { params: { per_page: 10 } }, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('should get a list of 10 users', async () => {
    expect(tenListResponse.status).to.equal(StatusCodes.OK);
    expect(tenListResponse.data.length).to.equal(10);
  });

  before(async () => {
    oneHundredListResponse = await axios.get('https://api.github.com/users', { params: { per_page: 100 } }, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('should get a list of 100 users', async () => {
    expect(oneHundredListResponse.status).to.equal(StatusCodes.OK);
    expect(oneHundredListResponse.data.length).to.equal(100);
  });
});
