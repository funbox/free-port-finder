const net = require('net');

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
