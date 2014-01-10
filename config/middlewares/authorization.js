module.exports = {
	hasAuthorization: function(req, res, next) {
    
    if(req.session.adminCode) {
			next();
		}
    
    else if( !req.session.adminCode && req.body.adminCode ) {
      var check = ( req.body.adminCode === 'testcode' );
      
      if(check) {
        req.session.adminCode = req.body.adminCode;
        next();
      }
      else {
        res.render('admin/login.jade', {
          loginFailed: true
        });
      }
    }
    
		else {
			res.render('admin/login.jade');
		}
	}
}