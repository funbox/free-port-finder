# @funboxteam/free-port-finder

The package checks availability of the passed port, or trying to find the first free port starting from the passed one.

`isPortFree` accepts port and returns bool value (port status) through a Promise instance.

`findFreePort` accepts port and returns first available port (starting from the passed one) through a Promise instance.

## Usage

Searching for the available port:

```javascript
const { findFreePort } = require('@funboxteam/free-port-finder');

const port = 3000;

findFreePort(port)
  .then(freePort => {
    config.devServer.port = freePort;
  });
```

Checking for availability of the passed port:

```javascript
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
