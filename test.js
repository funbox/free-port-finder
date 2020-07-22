const net = require('net');
const test = require('ava');
const pify = require('pify');

const { findFreePort, isPortFree } = require('.');

test('should return the passed port value', async (t) => {
  const port = await findFreePort(3000);

  t.is(port, 3000);
});

test('should throw a port searching error when finding port outside the available range', async (t) => {
  const port = await t.throwsAsync(() => findFreePort(65536));

  t.true(port.message.includes('should be >= 0 and < 65536. Received 65536.'));
});

test('should return `true` when available port is chosen', async (t) => {
  const port = await isPortFree(3007);

  t.is(port, true);
});

test('should return `false` when occupied port is chosen', async (t) => {
  const needfulPort = 3010;

  const server = net.createServer();
  await pify(server.listen.bind(server))(needfulPort, '0.0.0.0');

  const port = await isPortFree(needfulPort);

  t.is(port, false);
});

test('should throw a port searching error when checking port outside the available range', async (t) => {
  const port = await t.throwsAsync(() => isPortFree(65536));

  t.true(port.message.includes('should be >= 0 and < 65536. Received 65536.'));
});

test('should return first available port', async (t) => {
  const needfulPort = 3005;

  const server = net.createServer();
  await pify(server.listen.bind(server))(needfulPort, '0.0.0.0');

  const port = await findFreePort(needfulPort);

  t.not(port, needfulPort);
});

test('should return the passed port value of the requested host', async (t) => {
  const port = await findFreePort(3000, '127.0.0.1');

  t.is(port, 3000);
});

test('should return `false` when occupied port of a requested host is chosen', async (t) => {
  const requestedHost = '127.0.0.1';
  const requestedPort = 3010;

  const server = net.createServer();
  await pify(server.listen.bind(server))(requestedPort, requestedHost);

  const port = await isPortFree(requestedPort, requestedHost);

  t.is(port, false);
});

test('should return `true` when port of requested host is free whereas the same port of the default host is occupied', async (t) => {
  const requestedHost = '127.0.0.1';
  const requestedPort = 3011;

  const server = net.createServer();
  await pify(server.listen.bind(server))(requestedPort, '0.0.0.0');

  const port = await isPortFree(requestedPort, requestedHost);

  t.is(port, true);
});
