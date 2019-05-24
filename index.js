const express = require('express')
const app = express()
const port = 3000
var path = require('path');

var spawn   = require('child_process').spawn;

app.use(express.static(__dirname));

//renders the html page
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname + '/app.html'));
});


//input button submits form "/runscript" and activates the commands in spawn()

/////// NETWORK CREATE ///////

app.get('/network', function(req, res) {
  var command = spawn(__dirname + '/createnetwork.sh', [req.query.vnetname, req.query.vnetip, req.query.privatevnetsubnet, req.query.privatevnetip, req.query.publicvnetsubnet, req.query.publicvnetip]);
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

////// VM CREATE ///////

app.get('/createvm', function(req, res) {
  var command = spawn(__dirname + '/createvm.sh', [req.query.VMname, req.query.VMnetwork, req.query.VMsubnet, req.query.VMuser, req.query.VMpassword]);
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

/////// CREATE AND DELETE USERS ///////

app.get('/users', function(req, res) {
  var command = spawn(__dirname + '/users.sh', [req.query.dirAction, req.query.dirUsername]);
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

///// CREATE AND DELETE ROLES //////

app.get('/roles', function(req, res) {
  var command = spawn(__dirname + '/roles.sh', [req.query.roleUsername, req.query.roleAction, req.query.roleType]);
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

///// WEBAPP CREATE //////

app.get('/webapp', function(req, res) {
  var command = spawn(__dirname + '/webapp.sh', [req.query.webappname, req.query.gitrepo]);
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

////// BLOB STORAGE /////

app.get('/blob', function(req, res) {
  var command = spawn(__dirname + '/storage.sh', [req.query.storagename, req.query.containername]);
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

///// CREATE SQLDB /////

app.get('/sqldb', function(req, res) {
  var command = spawn(__dirname + '/sqldb.sh', [req.query.sqlserver, req.query.sqlusername, req.query.sqlpassword, req.query.sqldbname]);
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
//      window.location.replace("https://lechickencloudserver.azurewebsites.net/")
  });
});

////// CREATE COSMOS DB ///////

app.get('/cosmos', function(req, res) {
  var command = spawn(__dirname + '/cosmos.sh', [req.query.cosmosaccount, req.query.cosmosdbname, req.query.cosmosdbcollection]);
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

app.listen(port, () => console.log(`listening on port ${port}!`))
