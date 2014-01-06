var fs = require('fs');

module.exports = function(app) {
  
  app.get('/intro', function(req, res) {
    res.render('pages/index.jade');
  });
  
  app.get('/', function(req, res) {
    res.render('pages/main.jade')
  });
  
  app.get('/about', function(req, res) {
    res.render('pages/about.jade');
  })
  
  app.get('/admin', function(req, res) {
    fs.readFile('admin/list.txt', 'utf8', function(err, data) {
      if(err) throw new Error(err.message);
      else {
        var list = data.split(',');
        
        var param = {};
        param.videoData = [];
        for(var i=0; i<list.length; i++) {
          var data = {};
          data.thumbnail = null;
          data.src = list[i];
          param.videoData.push(data);
        };
        
        res.render('../admin/admin.jade', param);
      }
    });
  });
}