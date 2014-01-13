var Video = require('mongoose').model('Video');

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
    Video.load(function(videos) {
      var templateData = {
        pageInfo: 'admin',
        videoData: videos
      };
      
      res.render('admin/admin.jade', templateData);
    });
  },
  
  upload: function(req, res) {
    Video.load(function(videos) {
      
      var templateData = {
        pageInfo: 'admin',
        videoData: videos
      };
      
      // 업로드 성공
      if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
        var video = new Video(req.body);
        video.save();
        
        req.method = 'GET';
        res.redirect('/admin');
      }
      
      // 업로드 실패 : 발생 확률 거의 없음( 클라이언트에서 null 체크 다 함. )
      else {
        res.render('admin/error.jade', templateData);
      }
    });
  },
  
  edit: function(req, res) {
    Video.load(function(videos) {
      if( req.body && req.body.url && req.body.title && req.body.vid && req.body.thumbnail ) {
        Video.modify(req.body, function(video) {
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
    Video.discard(req.body.vid, function() {
      res.status(200).json({ success: true });
    });
  }
}