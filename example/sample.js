// Example of how to use this package

var { cleanupSCSSsAtPath } = require('../index');
var startPointsObj = require("./start-points.json");

var directoryPath = "/Users/Anshul/railsApp/public/stylesheets/";
var ignoreFilesRegex = /\.html$/;
var ignoreFoldersRegex = /test/;
var startPointsSCSS = Object.keys(startPointsObj).reduce((accumulator, key) => accumulator.concat(startPointsObj[key]), []);

cleanupSCSSsAtPath(directoryPath, ignoreFilesRegex, ignoreFoldersRegex, startPointsSCSS);
