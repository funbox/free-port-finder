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

`findFreePort(port: number): Promise<number>` находит первый доступный порт, начиная с переданного:

```js
const { findFreePort } = require('@funboxteam/free-port-finder');

const port = 3000;

findFreePort(port)
  .then(freePort => {
    config.devServer.port = freePort;
  });
```

`isPortFree(port: number): Promise<bool>` проверяет доступность переданного порта:

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

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
