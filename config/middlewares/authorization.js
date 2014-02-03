module.exports = {
	hasAuthorization: function(req, res, next) {
    
    if(req.session.adminCode) {
			next();
		}
    
    else if( !req.session.adminCode && req.body.adminCode ) {
      var check = ( req.body.adminCode === 'cuhappy2014' );
      
      if(check) {
        req.session.adminCode = req.body.adminCode;
        next();
      }
      else {
        var templateData = {
          loginFailed: true,
          pageInfo: 'login'
        };
        
        res.render('admin/login.jade', templateData);
      }
    }
    
		else {
      var templateData = {
        pageInfo: 'login'
      };
      
			res.render('admin/login.jade', templateData);
		}
	}
}