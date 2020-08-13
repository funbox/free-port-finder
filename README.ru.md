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

## Алгоритм работы

Для того, чтобы понять, свободен порт или нет, пакет пытается поднять на
указанном порту TCP-сервер. Если сервер поднимается без проблем, то пакет его
убивает и сигнализирует, что порт свободен.
Если при поднятии возникает ошибка `EADDRINUSE`, то сигнализирует, что порт занят.
Если какая-то иная, то выбрасывает её.

У этого решения есть как плюсы, так и минусы.

**Минусы:**<br/>
В некоторых ОС возможна некорректная обработка `SO_REUSEADDR`, и свободный для
использования порт может быть воспринят как занятый (но не наоборот).

**Плюсы:**<br/>
Можно было бы пойти иным путём, и пробовать подключаться к сокетам по указанному
адресу, а не поднимать на них свой сервер. Но в таком случае возможна ситуация,
когда подключение к сокету может инициировать какой-то процесс в его обработчике,
который потенциально может быть необратимым. Потому текущее решение безопасное.

[![Sponsored by FunBox](https://funbox.ru/badges/sponsored_by_funbox_centered.svg)](https://funbox.ru)
