const axios = require('axios');
const { expect, assert } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Consume PUT Method', () => {
  it('should follow aperdomob', async () => {
    const response = await axios.put('https://api.github.com/user/following/aperdomob', {}, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    expect(response.data).to.equal('');
  });

  it('verify that I follow aperdomob', async () => {
    const response = await axios.get('https://api.github.com/user/following', {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    const followingInfo = response.data.find((element) => element.login === 'aperdomob');
    assert.exists(followingInfo);
  });

  it('follow aperdomob again - idempotent', async () => {
    const response = await axios.put('https://api.github.com/user/following/aperdomob', {}, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
    expect(response.data).to.equal('');
  });

  it('verify that I follow aperdomob - idempotent', async () => {
    const response = await axios.get('https://api.github.com/user/following', {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
    const followingInfo = response.data.find((element) => element.login === 'aperdomob');
    assert.exists(followingInfo);
  });
});
