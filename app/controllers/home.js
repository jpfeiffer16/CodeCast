var fs = require('fs');

module.exports = function (req, res) {
  fs.readFile('./app/views/home.html', 'utf8', function(err, data) {
    if (!err) {
      res.end(data);
    } else {
      res.end('Error: ' + err.message);
    }
  });
};