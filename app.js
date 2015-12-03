var chokidar = require('chokidar');
 
// One-liner for current directory, ignores .dotfiles
chokidar.watch('.').on('all', function(event, path) {
  console.log(event, path);
});