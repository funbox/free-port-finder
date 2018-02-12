const net = require('net');

const isPortFree = port => new Promise(
  (resolve) => {
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

    server.listen(port, '0.0.0.0');
  },
);

const findFreePort = port => isPortFree(port)
  .then((isFree) => {
    if (isFree) {
      return port;
    }

    return findFreePort(port + 1);
  });

module.exports = {
  findFreePort: port => findFreePort(port),
  isPortFree: port => isPortFree(port),
};
