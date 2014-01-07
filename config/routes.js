var pages = require('../app/controllers/pages');
var admin = require('../app/controllers/admin');

module.exports = function(app) {
  
  app.get('/intro', pages.intro);
  app.get('/', pages.main);
  app.get('/about', pages.about);
  
  app.get('/admin', admin.admin);
  app.post('/admin/ajax', admin.ajax);
}