const express = require('express')
const app = express()
const port = 3000
var path = require('path');

var spawn   = require('child_process').spawn;

app.use(express.static(__dirname));

//renders the html page
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname + '/index.html'));
});

//input button submits form "/runscript" and activates the commands in spawn() 
app.get('/runscript', function(req, res) {
  var command = spawn(__dirname + '/testscript.sh', [req.query.textField]);
  var output  = [];

  command.stdout.on('data', function(chunk) {
      //I console.loged this below and it returned '1'. Not sure why...
    output.push(chunk);
  });

  //I believe this is where the real action occurs
command.on('close', function(code) {
    if (code === 0)
      res.send(Buffer.concat(output)); //console.loged this and it showed a lot of stuff... 
    else
      res.send(500); // when the script fails, generate a Server Error HTTP response
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


