var Video = require('mongoose').model('Video');

module.exports = {
  admin: function(req, res) {
    var param = {};
    param.videoData = [];
    
    res.render('admin/admin.jade', param);
  },
  
  ajax: function(req, res) {
    var data = req.body;
    
    if( data && data.url && data.title && data.vid && data.thumbnail ) {
      res.status(201).json({ success: true });
    }
    else {
      res.status(400).json();
    }
  }
}


// list.txt 에 들어갈 예제 샘플.
// 파일에 동영상 제목, 썸네일, 동영상 url, order 이 저장되어야함. JSON 구조.
