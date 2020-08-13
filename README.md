# @funboxteam/free-port-finder

[![npm](https://img.shields.io/npm/v/@funboxteam/free-port-finder.svg)](https://www.npmjs.com/package/@funboxteam/free-port-finder)

The package checks availability of the passed port, or tries to find the first available port starting from the passed one.

[По-русски](./README.ru.md)

## Rationale

When you start a TCP (or HTTP) server on localhost you want to be sure that the desirable port isn't occupied 
or you don't really care and want to get the first available one. 

This tiny tool takes on this task. 

## Installation

```bash
npm install --save-dev @funboxteam/free-port-finder
```

## Usage

`findFreePort(port: number, host?: string): Promise<number>` searches for the available port starting from the passed one:

```js
const { findFreePort } = require('@funboxteam/free-port-finder');

const port = 3000;

findFreePort(port)
  .then(freePort => {
    config.devServer.port = freePort;
  });
```

`isPortFree(port: number, host?: string): Promise<bool>` checks the availability of the passed port:

```js
const { isPortFree } = require('@funboxteam/free-port-finder');

const port = 3000;

isPortFree(port)
  .then(isFree => {
    if (isFree) {
      // start
    } else {
      // cancel
    }
  });
```

It is possible to pass host value as second parameter. The default host value is `'0.0.0.0'`.

To check if port on specified host is available:

```js
const { isPortFree } = require('@funboxteam/free-port-finder');

const port = 3000;
const host = '127.0.0.1';

isPortFree(port, host)
  .then(isFree => {
    if (isFree) {
      // start
    } else {
      // cancel
    }
  });
```

## How it works

In order to understand whether the port is free or not, this package tries to
run a TCP-server on the specified port. If the server starts, then package kills
it and signals that the port is free. If an `EADDRINUSE` error occurs, it signals
that the port is busy. If any other error occurs, then package throws it out.

This solution has both pros and cons.

**Cons:**<br/>
In some OS incorrect `SO_REUSEADDR` processing is possible, and a free port can
be signaled as busy (but not vice versa).

**Pros:**<br/>
It would be possible to go the other way, and try to connect to sockets at
a specified address, rather than run server on them. But in this case,
it is possible that the connection to a socket may initiate some process
in its handler, which could potentially be irreversible. Therefore,
current solution is safe.

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
