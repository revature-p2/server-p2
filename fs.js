const express = require('express')
const app = express()
const port = 3000
var path = require('path');
var fs = require('fs');
var spawn   = require('child_process').spawn;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    });

fs.readFile(__dirname + '/testscript.sh', 'utf8', function(err, contents) {
    app.get('/runscript', function(req, res) {
        res.send(contents)
    //     command.on('close', function(code) {
    //     if (code === 0)
    //     res.send(Buffer.concat(spawn(contents)))
    // });
    });
});
    //console.log('after calling readFile');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))