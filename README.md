[![MIT License][license-image]][license-url]

This package was build cleanup all the unused scss files of a codebase

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i @anshckr/cleanup-scss-files
```
Note: add --save if you are using npm < 5.0.0

In Node.js:
```js
var cleanupSCSSsAtPath = require('@anshckr/cleanup-scss-files');
```
## Pre-requesite

For this utility to work, all the import statements should be in valid format (Please sanitize your scss import statements for this util to work)->

```
// for importing partials, remove '_' prefix and '.scss' suffix from import statements

@import "variables"; // valid

@import "_variables.scss"; // invalid
@import "_variables"; // invalid
@import "variables.scss"; // invalid
```

## API

### 1. `cleanupSCSSsAtPath` (Deletes all the unused SCSS files in the directory)

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `dirPath`  | `String`  | **Required**. The directory where you want to run the cleanup at  |
| `paramsStartPointSCSSs` | `Array` | **Required**. Array of starting point scss files to consume during cleanup |
| `paramsIgnoreFilesRegex` | `Regex` | **Optional**. Regular expression to match file names to ignore during cleanup. **Default:** /$^/ |
| `paramsIgnoreFoldersRegex` | `Regex` | **Optional**. Regular expression to match folder names to ignore during cleanup. **Default:** /$^/ |

## Usage

Refer the [example folder](https://github.com/anshckr/cleanup-scss-files/tree/master/example)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/anshckr/cleanup-scss-files/issues). You can also take a look at the [contributing guide](https://github.com/anshckr/cleanup-scss-files/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## License

@anshckr/cleanup-scss-files is freely distributable under the terms of the [MIT license](https://github.com/anshckr/cleanup-scss-files/blob/master/LICENSE).
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE