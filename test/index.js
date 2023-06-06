const net = require('node:net');
const { expect } = require('chai');

const { findFreePort, isPortFree } = require('..');

const requestedPort = 3010;
const requestedHost = '127.0.0.1';
const defaultHost = '0.0.0.0';

describe('findFreePort', () => {
  it('should return a port value when port if free', async () => {
    const port = await findFreePort(3000);

    expect(port).to.equal(3000);
  });

  it('should throw a port searching error when port is found outside the available range', async () => {
    let thrownError;

    try {
      await findFreePort(65536);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError?.code).to.equal('ERR_SOCKET_BAD_PORT');
  });

  it('should return a port value of the requested host', async () => {
    const port = await findFreePort(3000, '127.0.0.1');

    expect(port).to.equal(3000);
  });

  it('should return first available port', (done) => {
    const server = net.createServer();

    server.once('listening', async () => {
      server.once('close', done);

      const port = await findFreePort(requestedPort);
      expect(port).to.not.equal(requestedPort);

      server.close();
    });

    server.listen(requestedPort, defaultHost);
  });
});

describe('isPortFree', () => {
  it('should return `true` when port is free', async () => {
    const isFree = await isPortFree(3007);

    expect(isFree).to.equal(true);
  });

  it('should throw a port searching error when port is outside the available range', async () => {
    let thrownError;

    try {
      await isPortFree(65536);
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError?.code).to.equal('ERR_SOCKET_BAD_PORT');
  });

  it('should return `false` when port is occupied', (done) => {
    const server = net.createServer();

    server.once('listening', async () => {
      server.once('close', done);

      const isFree = await isPortFree(requestedPort);
      expect(isFree).to.equal(false);

      server.close();
    });

    server.listen(requestedPort, defaultHost);
  });

  it('should return `false` when port of a requested host is occupied', (done) => {
    const server = net.createServer();

    server.once('listening', async () => {
      server.once('close', done);

      const isFree = await isPortFree(requestedPort, requestedHost);
      expect(isFree).to.equal(false);

      server.close();
    });

    server.listen(requestedPort, requestedHost);
  });
});
