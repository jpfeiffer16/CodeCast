var fs = require('fs');



module.exports = (function() {
  var callbacks = [];
  
  
  function onTick(callback) {
    if (typeof(callback) == 'function') {
      callbacks.push(callback);
    }
  }
  
  fs.readFile('./output.ccst', 'utf8', function(err, data) {
    if (err) {
      console.log('Error loading file: ' + err.message);
      return;
    }
    var index = 0;
    var codeCache = JSON.parse(data);
    function doTick() {
      if (index < codeCache.length) {
        callbacks.forEach(function(item) {
          item(codeCache[index]);
        });
        index++;
      } else {
        index = 0;
      }
    }
    setInterval(doTick, 1000);
  });
  
  
  
  
  return {onTick: onTick};
})();