
/**
 * Module dependencies.
 */
 
var http = require('http');
var express = require('express');
var env    = process.env.NODE_ENV || 'development';
var config   = require('./config/config')[env];

// SQLite3 initialize
require('./app/models/video').init();

// express setting
var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port);

process.on('uncaughtException', function(err) {
  console.log('Unexpected exception: ' + err.message);
  console.log(err.stack);
});