var ua = require('mobile-agent');

module.exports = {
	checkUserAgent: function(req, res, next) {
    
    var agent = ua( req.headers['user-agent'] );
    
    if( agent.Mobile === true ) {
      var templateData = {
        pageInfo: 'admin'
      };
      
      res.render('admin/mobileGuide.jade', templateData);
    }
    else {
      next();
    }
  }
}