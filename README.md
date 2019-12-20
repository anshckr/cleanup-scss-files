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
var {
  cleanupSCSSsAtPath
} = require('@anshckr/cleanup-scss-files');
```

## API

```
This package exposes the following utilities ->

1) cleanupSCSSsAtPath
/**
 * { Cleanup all the unused SCSS files at the dirPath }
 *
 * @param      {<string>}    dirPath                                The directory where you want to run the cleanup at
 * @param      {<Regex>}     paramsIgnoreFilesRegex                 Regular expression to match file names to ignore during cleanup
 * @param      {<Regex>}     paramsIgnoreFoldersRegex               Regular expression to match folder names to ignore during cleanup
 * @param      {<Array>}     [paramsStartPointsSCSS=[]]      Array of starting point scss files to consume during cleanup
 */

```

## Usage [refer the example folder]

## License

@anshckr/cleanup-scss-files is freely distributable under the terms of the [MIT license](https://github.com/anshckr/cleanup-scss-files/blob/master/LICENSE).
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE