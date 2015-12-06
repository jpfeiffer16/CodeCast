var chokidar = require('chokidar');
var fs = require('fs');
var fileState = [];



process.on('SIGINT', function() {
  console.log('Bye bye');
  // console.dir(fileState);
  fs.writeFile('./output.ccst', JSON.stringify(fileState), 'utf8', function(err) {
    if (!err) {
      console.log('File written successfully');
    } else {
      console.log('Error writing file: ' + err.message);
    }
    process.exit();
  });
});

module.exports = (function() {
  function watchFile(filename) {
    chokidar.watch('.').on('all', function(event, path) {
      if (event == 'change') {
        fs.readFile(filename, 'utf8', function(err, data) {
          if (!err)
          {
            fileState.push(data);
          }
        });
      }
    });
  };
  
  return {
    watchFile: watchFile
  };
  
})();