const net = require('net');
const test = require('ava');

const { findFreePort, isPortFree } = require('.');

const requestedPort = 3010;
const requestedHost = '127.0.0.1';
const defaultHost = '0.0.0.0';

const wrapper = (t, run) => new Promise(resolve => run(t, resolve));

test.serial('should return the passed port value', async (t) => {
  const port = await findFreePort(3000);

  t.is(port, 3000);
});

test.serial('should throw a port searching error when finding port outside the available range', async (t) => {
  const port = await t.throwsAsync(() => findFreePort(65536));

  t.true(port.message.includes('should be >= 0 and < 65536. Received 65536.'));
});

test.serial('should return `true` when available port is chosen', async (t) => {
  const isFree = await isPortFree(3007);

  t.is(isFree, true);
});

test.serial('should throw a port searching error when checking port outside the available range', async (t) => {
  const port = await t.throwsAsync(() => isPortFree(65536));

  t.true(port.message.includes('should be >= 0 and < 65536. Received 65536.'));
});

test.serial('should return the passed port value of the requested host', async (t) => {
  const port = await findFreePort(3000, '127.0.0.1');

  t.is(port, 3000);
});

test.serial('should return `false` when occupied port is chosen', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const isFree = await isPortFree(requestedPort);
    t.is(isFree, false);

    server.close();
  });

  server.listen(requestedPort, defaultHost);
});

test.serial('should return first available port', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const port = await findFreePort(requestedPort);
    t.not(port, requestedPort);

    server.close();
  });

  server.listen(requestedPort, defaultHost);
});

test.serial('should return `false` when occupied port of a requested host is chosen', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const isFree = await isPortFree(requestedPort, requestedHost);
    t.is(isFree, false);

    server.close();
  });

  server.listen(requestedPort, requestedHost);
});

