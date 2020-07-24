const net = require('net');

const server1 = net.createServer();
server1.listen(3000, '0.0.0.0');

const server2 = net.createServer();
server2.listen(3000, '127.0.0.1');
