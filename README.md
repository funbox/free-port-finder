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

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
