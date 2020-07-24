const net = require('net');
const test = require('ava');

const { findFreePort, isPortFree } = require('.');

const requestedPort = 3010;
const requestedHost = '127.0.0.1';
const defaultHost = '0.0.0.0';

const server1 = net.createServer();
server1.on('error', err => {
  console.log('server 1 error', err);
});
server1.listen(5000, '0.0.0.0', () => {
  console.log('server 1', server1.address());
});

const server2 = net.createServer();
server2.on('error', (err) => {
  console.log('server 2 error', err);
});
server2.listen(5000, '127.0.0.1', () => {
  console.log('server 2', server2.address());
});

const server3 = net.createServer();
server3.on('error', err => {
  console.log('server 3 error', err);
});
server3.listen(5000, '127.0.0.1', () => {
  console.log('server 3', server3.address());
});

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
  const port = await isPortFree(3007);

  t.is(port, true);
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

    const port = await isPortFree(requestedPort);
    t.is(port, false);

    setTimeout(() => server.close());
  });

  server.listen(requestedPort, defaultHost);
});

test.serial('should return first available port', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const port = await findFreePort(requestedPort);
    t.not(port, requestedPort);

    setTimeout(() => server.close());
  });

  server.listen(requestedPort, defaultHost);
});

test.serial('should return `false` when occupied port of a requested host is chosen', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const port = await isPortFree(requestedPort, requestedHost);
    t.is(port, false);

    setTimeout(() => server.close());
  });

  server.listen(requestedPort, requestedHost);
});

test.serial('should return `true` when port of requested host is free whereas the same port of the default host is occupied', wrapper, (t, done) => {
  const server = net.createServer();

  server.once('listening', async () => {
    server.once('close', done);

    const port1 = await isPortFree(requestedPort, defaultHost);
    t.is(port1, true);

    const port2 = await isPortFree(requestedPort, requestedHost);
    t.is(port2, false);

    setTimeout(() => server.close());
  });

  server.listen(requestedPort, requestedHost);
});
