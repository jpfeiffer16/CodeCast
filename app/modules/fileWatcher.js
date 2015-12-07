var chokidar = require('chokidar');
var fs = require('fs');
var outputDir = '../.output';


function writeOutput(data, callback) {
  fs.stat(outputDir, function(err, stat) {
    if (!err && stat.isDirectory()) {
      fs.readDir(outputDir, function(err, files) {
        if (!err) {
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
    chokidar.watch('./test.js').on('change', function(event, path) {
      fs.readFile(filename, 'utf8', function(err, data) {
        if (!err)
        {
          writeOutput(data);
        }
      });
    });
  }
  
  return {
    watchFile: watchFile
  };
  
})();