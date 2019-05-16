const express = require('express')
const app = express()
const port = 3000
var path = require('path');

var spawn   = require('child_process').spawn;

app.use(express.static(__dirname));

app.get('/', function (req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/runscript', function(req, res) {
  var command = spawn(__dirname + '/testscript.sh');
  var output  = [];

  command.stdout.on('data', function(chunk) {
    output.push(chunk);
  });
command.on('close', function(code) {
    if (code === 0)
      res.send(Buffer.concat(output));
    else
      res.send(500); // when the script fails, generate a Server Error HTTP response
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


