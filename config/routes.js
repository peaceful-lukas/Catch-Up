var pages = require('../app/controllers/pages');
var admin = require('../app/controllers/admin');

var auth = require('./middlewares/authorization').hasAuthorization;

module.exports = function(app) {
  
  // HOME PAGE
  app.get('/intro', pages.intro);
  app.get('/', pages.main);
  app.get('/about', pages.about);
  
  
  // ADMIN
  app.get('/admin', auth, admin.admin);
  
  app.post('/admin/login', auth, admin.login);
  app.post('/admin/ajax', auth, admin.ajax);
  
  
}