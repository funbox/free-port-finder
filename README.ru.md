# @funboxteam/free-port-finder

[![npm](https://img.shields.io/npm/v/@funboxteam/free-port-finder.svg)](https://www.npmjs.com/package/@funboxteam/free-port-finder)

Пакет позволяет проверить доступность заданного порта или найти свободный порт последовательным перебором значений, начиная с переданного.

## Назначение

Когда запускаешь TCP (или HTTP) сервер на localhost, хочется быть уверенным, что выбранный порт на занят. 
А порой и вовсе нужно просто найти первый попавшийся свободный.

Этот маленький пакет берёт на себя эту задачу.

## Установка

```bash
npm install --save-dev @funboxteam/free-port-finder
```

## Использование

`findFreePort(port: number, host?: string): Promise<number>` находит первый доступный порт, начиная с переданного:

```js
const { findFreePort } = require('@funboxteam/free-port-finder');

const port = 3000;

findFreePort(port)
  .then(freePort => {
    config.devServer.port = freePort;
  });
```

`isPortFree(port: number, host?: string): Promise<bool>` проверяет доступность переданного порта:

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

Также возможно явно указать хост с помощью второго параметра. По умолчанию
он равен `'0.0.0.0'`.

Например, чтобы проверить доступность порта 3000 на хосте 127.0.0.1:

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
