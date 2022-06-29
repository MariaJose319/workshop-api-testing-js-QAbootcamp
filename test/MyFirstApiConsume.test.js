const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  // Get only headers
  it('consume HEAD', async () => {
    const response = await axios.head('https://httpbin.org/headers');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers).to.have.property('content-type', 'application/json');
  });

  // Partial updates
  it('Consume PATCH', async () => {
    const body = {
      name: 'Maria',
      lastname: 'Sierra',
      age: '30',
      city: 'Cartagena'
    };

    const response = await axios.patch('https://httpbin.org/patch', body);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(body);
  });

  // Replace the resource in its entirety
  it('Consume PUT', async () => {
    const body = {
      name: 'Maria',
      lastname: 'Sierra',
      age: '30',
      city: 'Cartagena'
    };

    const response = await axios.put('https://httpbin.org/put', body);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(body);
  });

  it('Consume DELETE', async () => {
    const body = {
      name: 'Maria',
      lastname: 'Sierra',
      age: '30',
      city: 'Cartagena'
    };

    const response = await axios.delete('https://httpbin.org/delete', body);
    expect(response.status).to.equal(StatusCodes.OK);
  });

  it('Consume POST', async () => {
    const body = {
      name: 'Maria',
      lastname: 'Sierra',
      age: '30',
      city: 'Cartagena'
    };

    const response = await axios.post('https://httpbin.org/post', body);

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.eql(body);
  });
});
