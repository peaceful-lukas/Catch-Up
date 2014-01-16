var videoDB = require('../models/video');

module.exports = {
  login: function(req, res) {
    req.method = 'GET';
    res.redirect('/admin');
  },
  
  logout: function(req, res) {
    delete req.session.adminCode;
    res.json({ success: true });
  },
  
  admin: function(req, res) {
    videoDB.load(function(videos) {
      var templateData = {
        pageInfo: 'admin',
        videoData: videos
      };
      
      res.render('admin/admin.jade', templateData);
    });
  },
  
  upload: function(req, res) {
    // 업로드 성공
    if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
      videoDB.save(req.body, function() {
        req.method = 'GET';
        res.redirect('/admin');
      });
    }
    
    // 업로드 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
    else {
      error(req, res);
    }
  },
  
  edit: function(req, res) {
    videoDB.load(function(videos) {
      if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
        videoDB.modify(req.body, function(video) {
          req.method = 'GET';
          res.redirect('/admin');
        });
      }
      
      // edit 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
      else {
        var templateData = {
          pageInfo: 'admin'
        };
        
        res.render('admin/error.jade', templateData);
      }
    });
  },
  
  discard: function(req, res) {
    videoDB.discard(req.body._id, function() {
      res.status(200).json({ success: true });
    });
  }
}

function error(req, res) {
  videoDB.load(function(videos) {
      var templateData = {
        pageInfo: 'admin',
        videoData: videos
      };
      
      res.render('admin/error.jade', templateData);      
    });
}