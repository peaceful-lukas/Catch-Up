var Video = require('mongoose').model('Video');

module.exports = {
  admin: function(req, res) {
    Video.load(function(videos) {
      res.render('admin/admin.jade', { videoData: videos });
    });
  },
  
  ajax: function(req, res) {
    var data = req.body;
    
    if( data && data.url && data.title && data.vid && data.thumbnail ) {
      var video = new Video(data);
      video.save();
      
      res.status(201).json({ success: true });
    }
    else {
      res.status(400).json();
    }
  }
}