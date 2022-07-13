const axios = require('axios');
const { expect, assert } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('Consume POST and PATCH Method', () => {
  const user = 'MariaJose319';
  const repo = 'BootcampQA_PetStoreChallenge';
  const urlBase = 'https://api.github.com';
  let userResponse;
  let reposResponse;
  let createIssueResponse;
  let patchResponse;

  before(async () => {
    userResponse = await axios.get(`${urlBase}/user`, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('verify that the user has at least a public repository', async () => {
    expect(userResponse.status).to.equal(StatusCodes.OK);
    expect(userResponse.data.public_repos).to.be.above(0);
  });

  before(async () => {
    reposResponse = await axios.get(userResponse.data.repos_url, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('get a list of repositories and verify that one exists', async () => {
    expect(reposResponse.status).to.equal(StatusCodes.OK);
    const reposList = reposResponse.data;
    const repoInfo = reposList.find((element) => element.name === repo);
    assert.exists(repoInfo);
  });

  before(async () => {
    createIssueResponse = await axios.post(`${urlBase}/repos/${userResponse.data.login}/${repo}/issues`, {
      title: 'Example issue'
    }, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('Create an issue with its title - POST', async () => {
    expect(createIssueResponse.status).to.equal(StatusCodes.CREATED);
    expect(createIssueResponse.data.title).to.equal('Example issue');
    expect(createIssueResponse.data.body).to.equal(null);
  });

  before(async () => {
    patchResponse = await axios.patch(`${urlBase}/repos/${user}/${repo}/issues/${createIssueResponse.data.number}`, {
      body: 'this is a body example for issue'
    }, {
      headers: {
        Authorization: `token ${process.env.ACCESS_TOKEN}`
      }
    });
  });

  it('Add a body - PATCH', async () => {
    expect(patchResponse.status).to.equal(StatusCodes.OK);
    expect(patchResponse.data.title).to.equal('Example issue');
    expect(patchResponse.data.body).to.equal('this is a body example for issue');
  });
});
