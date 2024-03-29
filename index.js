const net = require('node:net');

const isPortFree = (port, host = '0.0.0.0') => new Promise((resolve) => {
  const server = net.createServer();

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      resolve(false);
    } else {
      throw err;
    }
  });

  server.once('listening', () => {
    server.once('close', () => {
      resolve(true);
    });
    server.close();
  });

  server.listen(port, host);
});

const findFreePort = (port, host = '0.0.0.0') => isPortFree(port, host)
  .then((isFree) => {
    if (isFree) {
      return port;
    }

    return findFreePort(port + 1, host);
  });

module.exports = {
  findFreePort,
  isPortFree,
};
