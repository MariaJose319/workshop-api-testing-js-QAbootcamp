const fs = require('fs');
const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');

const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

describe('Github Api Test', () => {
  describe('Consume GET Method', () => {
    let userResponse;
    let repositoriesResponse;
    let repoInfo;
    let repoListResponse;
    let readmeInfo;
    let downloadREADMEResponse;

    before(async () => {
      userResponse = await axios.get('https://api.github.com/users/aperdomob', {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('should get GitHub user information', async () => {
      expect(userResponse.status).to.equal(StatusCodes.OK);
      expect(userResponse.data.name).to.equal('Alejandro Perdomo');
      expect(userResponse.data.company).to.equal('Perficient Latam');
      expect(userResponse.data.location).to.equal('Colombia');
    });

    before(async () => {
      repositoriesResponse = await axios.get(userResponse.data.repos_url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      repoInfo = repositoriesResponse.data.find((element) => element.name === 'jasmine-json-report');
    });

    it('should get repository information', async () => {
      expect(repositoriesResponse.status).to.equal(StatusCodes.OK);
      expect(repoInfo.full_name).to.equal('aperdomob/jasmine-json-report');
      expect(repoInfo.private).to.equal(false);
      expect(repoInfo.description).to.equal('A Simple Jasmine JSON Report');
    });

    it('should download zip repository', async () => {
      const path = 'data.zip';
      const writer = fs.createWriteStream(path);
      const downloadZipResponse = await axios.get(`${repoInfo.url}/zipball/master`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        responseType: 'stream'
      });
      expect(downloadZipResponse.status).to.equal(StatusCodes.OK);
      downloadZipResponse.data.pipe(writer);
      expect(fs.existsSync(path)).to.equal(true);
    });

    before(async () => {
      repoListResponse = await axios.get(`${repoInfo.url}/contents`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      readmeInfo = repoListResponse.data.find((element) => element.name === 'README.md');
    });

    it('should get a list of repository files and find README.md', async () => {
      expect(repoListResponse.status).to.equal(StatusCodes.OK);
      expect(readmeInfo).containSubset({
        name: 'README.md',
        path: 'README.md',
        sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      });
    });

    before(async () => {
      downloadREADMEResponse = await axios.get(readmeInfo.download_url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('should download README file', async () => {
      expect(downloadREADMEResponse.status).to.equal(StatusCodes.OK);
      const fileContent = downloadREADMEResponse.data;
      expect(md5(fileContent)).to.equal('497eb689648cbbda472b16baaee45731');
    });
  });
});
