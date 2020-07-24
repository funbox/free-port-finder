const net = require('net');

const isPortFree = (port, host = '0.0.0.0') => new Promise((resolve) => {
  console.log('is port free', port, host);
  const server = net.createServer();

  server.once('error', (err) => {
    console.log('error occured', port, host);
    if (err.code === 'EADDRINUSE') {
      console.log('eaddinuse', port, host);
      resolve(false);
    } else {
      console.log('not eaddinuse', port, host);
      throw err;
    }
  });

  server.once('listening', () => {
    console.log('listening', port, host);
    server.once('close', () => {
      console.log('closing', port, host);
      resolve(true);
    });
    console.log('try to close', port, host);
    server.close();
  });

  console.log('listen', port, host);
  server.listen(port, host);
});

const findFreePort = (port, host) => isPortFree(port, host)
  .then((isFree) => {
    if (isFree) {
      return port;
    }

    return findFreePort(port + 1, host);
  });

module.exports = {
  findFreePort: (port, host) => findFreePort(port, host),
  isPortFree: (port, host) => isPortFree(port, host),
};
