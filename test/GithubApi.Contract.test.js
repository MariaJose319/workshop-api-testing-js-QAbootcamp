const axios = require('axios');
const chai = require('chai');
const { StatusCodes } = require('http-status-codes');
const { listPublicEventsSchema } = require('./schema/ListPublicEvents.schema');

const { expect } = chai;
chai.use(require('chai-json-schema'));

const urlBase = 'https://api.github.com';

describe('Given event Github API resources', () => {
  describe('When wanna verify the List public events', () => {
    let response;

    before(async () => {
      response = await axios.get(`${urlBase}/events`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('then the body should have a schema', async () => {
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data).to.be.jsonSchema(listPublicEventsSchema);
    });
  });
});
