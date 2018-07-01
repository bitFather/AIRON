const express = require('express');
const app = express();
const path = require('path');

app.use('/', express.static(__dirname +  '/dist/'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



const hostname = '0.0.0.0';
const port = 3000;

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);  
});
