'use strict';

var fs = require('fs');
var path = require('path');
var lineByLine = require('n-readlines');

// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var ignoreFilesRegex, ignoreFoldersRegex;

var allUsedSCSSFiles = [];

var startPointSCSSs = [];

function recursiveFilesMarker(filePath) {
  var liner = new lineByLine(filePath);
  var line;

  while (line = liner.next()) {
    line = line.toString('ascii');
    if(line.indexOf('@import') >= 0) {
      var relativeChildFilePath = line.split('@import ').pop().split(';').shift().slice(1, -1) + '.scss';

      var childFilePath = path.resolve(path.dirname(filePath), relativeChildFilePath);

      if (!fs.existsSync(childFilePath)) {
        childFilePath = childFilePath.slice(0, childFilePath.lastIndexOf('/') + 1) + '_' + childFilePath.slice(childFilePath.lastIndexOf('/') + 1)
      }

      allUsedSCSSFiles.push(childFilePath);

      recursiveFilesMarker(childFilePath);
    }
  }
}

function recursiveDirFilesIterator(dirPath, cb) {
  var files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach(function(file, index) {
    var filePath = path.resolve(dirPath, file.name);

    if (file.isFile()) {
      if (ignoreFilesRegex.test(file.name) || path.extname(file.name) !== '.scss') {
        console.log("Skipping file: '%s'", filePath);
      } else {
        cb(filePath);
      }
    } else if (file.isDirectory()) {
      if (!ignoreFoldersRegex.test(filePath)) {
        recursiveDirFilesIterator(filePath, cb);
      } else {
        console.log("Skipping directory: '%s'", filePath);
      }
    }
  });
}

function fileMarkerStarter(filePath) {
  if (startPointSCSSs.indexOf(filePath) !== -1) {
    allUsedSCSSFiles.push(filePath);

    recursiveFilesMarker(filePath);
  }
}

// Loop through all the files in the directory
var captureAllUsedSCSSFiles = function(dirPath) {
  try {
    recursiveDirFilesIterator(dirPath, fileMarkerStarter);

    return new Promise(function(resolve, reject) {
      allUsedSCSSFiles = [...new Set(allUsedSCSSFiles)];
      resolve(allUsedSCSSFiles);
    });
  } catch (err) {
    // An error occurred
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
}

function removeSCSSFile(filePath) {
  if (allUsedSCSSFiles.indexOf(filePath) === -1) {
    fs.unlinkSync(filePath);

    console.log("Deleted: '%s'", filePath);
  }
}

/**
 * { Cleanup all the unused SCSS files at the dirPath }
 *
 * @param      {<string>}    dirPath                                The directory where you want to run the cleanup at
 * @param      {<Regex>}     paramsIgnoreFilesRegex                 Regular expression to match file names to ignore during cleanup
 * @param      {<Regex>}     paramsIgnoreFoldersRegex               Regular expression to match folder names to ignore during cleanup
 * @param      {<Array>}     paramsStartPointSCSSs                  Array of starting point scss files to consume during cleanup
 */
function cleanupSCSSsAtPath(dirPath, paramsIgnoreFilesRegex, paramsIgnoreFoldersRegex, paramsStartPointSCSSs) {
  ignoreFilesRegex = paramsIgnoreFilesRegex;
  ignoreFoldersRegex = paramsIgnoreFoldersRegex;
  startPointSCSSs = startPointSCSSs.concat(paramsStartPointSCSSs);

  captureAllUsedSCSSFiles(dirPath).then(function() {
    recursiveDirFilesIterator(dirPath, removeSCSSFile);
  });
}

module.exports = cleanupSCSSsAtPath;
