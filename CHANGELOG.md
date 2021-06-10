# Changelog

## 3.1.1 (10.06.2021)

Fixed several security vulnerabilities:

- [Prototype Pollution](https://github.com/advisories/GHSA-qqgx-2p2h-9c37) in [ini](https://github.com/npm/ini). Updated from 1.3.5 to 1.3.8.

- [Use of a Broken or Risky Cryptographic Algorithm](https://github.com/advisories/GHSA-r9p9-mrjm-926w) in [elliptic](https://github.com/indutny/elliptic). Updated from 6.5.3 to 6.5.4.

- [Prototype Pollution](https://github.com/advisories/GHSA-c4w7-xm78-47vh) in [y18n](https://github.com/yargs/y18n). Updated from 4.0.0 to 4.0.1.

- [Command Injection](https://github.com/advisories/GHSA-35jh-r3h4-6jhm) in [lodash](https://github.com/lodash/lodash). Updated from 4.17.19 to 4.17.21.

- [Regular Expression Denial of Service](https://github.com/advisories/GHSA-43f8-2h32-f4cj) in [hosted-git-info](https://github.com/npm/hosted-git-info). Updated from 2.8.8 to 2.8.9.

- [Regular Expression Denial of Service](https://www.npmjs.com/advisories/1751) in [glob-parent](https://www.npmjs.com/package/glob-parent). Updated from 5.1.1 to 5.1.2. 

- [Regular Expression Denial of Service](https://www.npmjs.com/advisories/1755) in [normalize-url](https://www.npmjs.com/package/normalize-url). Updated from 4.5.0 to 4.5.1. 



## 3.1.0 (10.08.2020)

Added a second param to both functions, which allows to explicitly 
set host which will be used while testing ports. 

This is not a breaking change, because the param is optional. 
By default it's `0.0.0.0`.


## 3.0.0 (14.07.2020)

Prepared the package for publishing on GitHub.

Added LICENSE file.

Updated deps to fix `npm audit` errors.

## 2.0.1 (26.02.2019)

Fixed package name in README.

## 2.0.0 (06.07.2018)

Moved the package to @funboxteam scope.

Improved .gitignore.

## 1.2.0 (15.02.2018)

Fixed syntax errors to support old versions of Node.js.

## 1.1.0 (13.02.2018)

Added @funboxteam/eslint-config for linting.

## 1.0.0 (24.12.2017)

Initial version.
