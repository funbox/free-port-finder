# @funboxteam/free-port-finder

Плагин позволяет проверить доступность заданного порта или найти свободный порт последовательным перебором значений, начиная от заданного.

Метод `isPortFree` принимает номер порта и возвращает через промис булевое значение в зависимости от состояния порта.

Метод `findFreePort` принимает номер порта и возвращает через промис передаваемый или следующий свободный порт.

## Использование плагина в проекте

Поиск свободного порта:

```javascript
const { findFreePort } = require('@funboxteam/free-port-finder');

const port = 3000;

findFreePort(port)
  .then(freePort => {
    config.devServer.port = freePort;
  });
```

Проверка передаваемого порта:

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
