
/**
 * Module dependencies.
 */
 
var http = require('http');
var express = require('express');
var fs     = require('fs');
var mongoose = require('mongoose');
var env    = process.env.NODE_ENV || 'development';
var config   = require('./config/config')[env];

// Bootstrap db connection
var db = mongoose.connection;
mongoose.connect(config.db.host);

// Botstrap models
var MODEL_PATH = __dirname + '/app/models';
fs.readdirSync(MODEL_PATH).forEach(function (file) {
    if( ~file.indexOf('.js') ) require(MODEL_PATH + '/' + file);
});

// express setting
var app = express();
require('./config/express')(app, config);
require('./config/routes')(app);

var port = process.env.PORT || 3000;
var server = http.createServer(app).listen(port);

// process.on('uncaughtException', function(err) {
//   console.log('Unexpected exception: ' + err.message);
//   console.log(err.stack);
// });