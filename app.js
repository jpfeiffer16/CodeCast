var port = 3000;

var fileWatcher = require('./app/modules/fileWatcher');
var http = require('http');
var fs = require('fs');

var app = http.createServer(function(req, res) {
  // res.end('Hi');
  fs.stat('./app/controllers/' + req.url.substring(1) + '.js', function(err, stat) {
    if (!err && stat.isFile()) {
      require('./app/controllers/' + req.url.substring(1))(req, res);
    } else if (err) {
      res.end(err.message);
    } else {
      res.end('Hi');
    }
  });
}).listen(port, '127.0.0.1', function() {
  console.log('Server listening on port: ' + port);
});


//Temporary: For testing purposes


var fileWatcher = require('./app/modules/fileWatcher');

fileWatcher.watchFile('Test');


var io = require('socket.io')(app);

io.on('connection', function (socket) {
  var fileResult = require('./app/modules/resultStreamer');
  fileResult.onTick(function(code) {
    socket.emit('code', code);
  });
});