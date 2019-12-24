// Example of how to use this package

var cleanupSCSSsAtPath = require('../index');
var startPointsObj = require("./start-points.json");

var directoryPath = "/Users/Anshul/railsApp/public/stylesheets/app-live";
var ignoreFilesRegex = /$^/;
var ignoreFoldersRegex = /$^/;
var startPointsSCSS = Object.keys(startPointsObj).reduce((accumulator, key) => accumulator.concat(startPointsObj[key]), []);

/**
 * { Example usage of cleanupSCSSsAtPath with minimal required params }
 */
cleanupSCSSsAtPath(directoryPath, startPointsSCSS);
/**
 * { Example usage of cleanupSCSSsAtPath with all params }
 */
// cleanupSCSSsAtPath(directoryPath, startPointsSCSS, ignoreFilesRegex, ignoreFoldersRegex);
