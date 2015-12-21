module.exports = function(req, res) {
  
  var fileWatcher = require('../modules/fileWatcher');
  try {
    fileWatcher.watchFile('../../test.js');
    res.end('watching file');
  } catch (err) {
    res.end(err.message);
  }
};