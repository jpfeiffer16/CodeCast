var chokidar = require('chokidar');
var fs = require('fs');
var outputDir = '../output';


function writeOutput(data, callback) {
  console.log('writeOutput being called.');
  fs.stat(outputDir, function(err, stat) {
    if (!err && stat.isDirectory()) {
      fs.readDir(outputDir, function(err, files) {
        if (!err) {
          console.log('Reading directory and no errors. File: ', files.length);
          var fileName = files.length + 1;
          fs.witeFile(outputDir + '/' + fileName, data, 'utf8', function () {
            if (typeof(callback) == 'function') {
              callback();
            }
          });
        } else {
          throw err;
        }
      });
    } else if (err) {
      throw err;
    }
  });
}

module.exports = (function() {
  function watchFile(filename) {
    console.log('watchFile being called');
    chokidar.watch('./test.js').on('change', function(event, path) {
      fs.readFile('./test.js', 'utf8', function(err, data) {
        if (!err)
        {
          console.log('Writing output');
          writeOutput(data);
        }
      });
    });
  }
  
  return {
    watchFile: watchFile
  };
  
})();