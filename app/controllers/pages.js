var videoDB = require('../models/video');

module.exports = {
  intro: function(req, res) {
    var templateData = {
      pageInfo: 'intro'
    };
    
    res.render('pages/index.jade', templateData);
  },
  
  main: function(req, res) {
    videoDB.load(function(videos) {
      var templateData = {
        pageInfo: 'main',
        videoData: videos
      };
      
      res.render('pages/main.jade', templateData);
    });
  },
  
  about: function(req, res) {
    var templateData = {
      pageInfo: 'about'
    };
    
    res.render('pages/about.jade', templateData);
  }
}