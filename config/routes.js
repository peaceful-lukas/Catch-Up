var pages = require('../app/controllers/pages');
var admin = require('../app/controllers/admin');

var auth = require('./middlewares/authorization').hasAuthorization;
var userAagent = require('./middlewares/userAgent').checkUserAgent;

var middlewares = [ userAagent, auth ];

module.exports = function(app) {
  
  // HOME PAGE
  app.get('/intro', pages.intro);
  app.get('/', pages.main);
  app.get('/about', pages.about);
  
  
  // ADMIN
  app.get('/admin', middlewares, admin.admin);
  app.get('/admin/logout', admin.logout);
  
  app.post('/admin/login', middlewares, admin.login);
  app.post('/admin/upload', middlewares, admin.upload);
  app.post('/admin/edit', middlewares, admin.edit);
  app.post('/admin/discard', middlewares, admin.discard);
  
}