var videoDB = require('../models/video');
var showreelDB = require('../models/showreel');

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
      showreelDB.load(function(showreel) {
        
        // 쇼릴 없으면 추가.
        if( !showreel ) {
          showreelDB.save({
            title: 'showreel',
            url: 'http://www.youtube.com/watch?v=LdQwTwBV6GI',
            vid: 'LdQwTwBV6GI',
            thumbnail: 'http://img.youtube.com/vi/LdQwTwBV6GI/0.jpg'
          });
          
          req.method = 'GET';
          res.redirect('/admin');
        }
        
        else {
          var templateData = {
            pageInfo: 'admin',
            videoData: videos,
            showreel: showreel
          };
          
          res.render('admin/admin.jade', templateData);
        }
      });
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
    // edit 성공
    if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
      videoDB.modify(req.body, function(video) {
        req.method = 'GET';
        res.redirect('/admin');
      });
    }
    
    // edit 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
    else {
      error(req, res);
    }
  },
  
  discard: function(req, res) {
    videoDB.discard(req.body._id, function() {
      res.status(200).json({ success: true });
    });
  },
  
  showreelUpload: function(req, res) {
    // 업로드 성공
    if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
      showreelDB.save(req.body, function() {
        req.method = 'GET';
        res.redirect('/admin');
      });
    }
    
    // 업로드 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
    else {
      error(req, res);
    }
  },
  
  showreelEdit: function(req, res) {
    // edit 성공
    if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
      showreelDB.modify(req.body, function(video) {
        req.method = 'GET';
        res.redirect('/admin');
      });
    }
    
    // edit 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
    else {
      error(req, res);
    }
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