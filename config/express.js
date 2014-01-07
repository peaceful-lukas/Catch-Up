var express = require('express');

module.exports = function(app, config) {
  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(express.bodyParser({uploadDir: config.root + '/public/tmp/'}));
  app.use(express.methodOverride());

  app.use(app.router);
}