var port = 3000;

var fileWatcher = require('./app/fileWatcher');
var http = require('http');
var fs = require('fs');


fileWatcher.watchFile('./test.js');


var app = http.createServer(function(req, res) {
  // res.end('Hi');
  fs.readFile('./page.html', 'utf8', function(err, data) {
    if (!err) {
      res.end(data);
    } else {
      res.end('Error: ' + err.message);
    }
  });
}).listen(port, '127.0.0.1', function() {
  console.log('Server listening on port: ' + port);
});

var io = require('socket.io')(app);

io.on('connection', function (socket) {
  var fileResult = require('./app/resultStreamer');
  fileResult.onTick(function(code) {
    socket.emit('code', code);
  });
});