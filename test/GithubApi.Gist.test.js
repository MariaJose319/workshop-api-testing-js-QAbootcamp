const axios = require('axios');
const { expect, assert } = require('chai');
const { StatusCodes } = require('http-status-codes');

const chai = require('chai');
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

describe('Consume DELETE Method', () => {
  const urlBase = 'https://api.github.com';
  let createGistResponse;
  let infoGistResponse;
  let deleteGistResponse;
  let deletedResponse;

  describe('Create a gist', () => {
    const gistCode = `var myPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('Tick, Tick... Boom!');
      }, 3000);
    });`;

    const myGist = {
      description: 'this is a gist example with a promise',
      public: true,
      files: {
        'myPromise.js': {
          content: gistCode
        }
      }
    };

    before(async () => {
      createGistResponse = await axios.post(`${urlBase}/gists`, myGist, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('create a Gist with a promise', async () => {
      expect(createGistResponse.status).to.equal(StatusCodes.CREATED);
      expect(createGistResponse.data).containSubset(myGist);
    });

    before(async () => {
      infoGistResponse = await axios.get(createGistResponse.data.url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('verify the created Gist', async () => {
      expect(infoGistResponse.status).to.equal(StatusCodes.OK);
      assert.exists(infoGistResponse.data);
      expect(infoGistResponse.data).containSubset(myGist);
    });
  });

  describe('delete the gists', () => {
    before(async () => {
      deleteGistResponse = await axios.delete(createGistResponse.data.url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('delete the created Gist', async () => {
      expect(deleteGistResponse.status).to.equal(StatusCodes.NO_CONTENT);
    });
  });

  describe('verify the deleted gist', () => {
    before(async () => {
      try {
        deletedResponse = await axios.get(createGistResponse.data.url, {
          headers: {
            Authorization: `token ${process.env.ACCESS_TOKEN}`
          }
        });
      } catch (err) {
        deletedResponse = err.response;
      }
    });

    it('verify the deleted Gist', async () => {
      expect(deletedResponse.status).to.equal(StatusCodes.NOT_FOUND);
    });
  });
});
