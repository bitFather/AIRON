// var fs = require('fs');
// var vhost = require('vhost');
var express = require('express');
var http = require('http');
var app = express();
const path = require('path');

// app.use(vhost('localhost', require('./json_relay_node/index.js').app));

app.use('/', express.static(__dirname +  '/dist/'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var httpServer = http.createServer(app);
httpServer.listen(3000);

const hostname = '0.0.0.0';
const port = 3000;

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);  
});