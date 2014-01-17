var videoDB = require('../models/video');
var showreelDB = require('../models/showreel');

module.exports = {
  intro: function(req, res) {
    showreelDB.load(function(showreel) {
      var templateData = {
        pageInfo: 'intro',
        showreel: showreel
      };
      
      res.render('pages/index.jade', templateData);
    });
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