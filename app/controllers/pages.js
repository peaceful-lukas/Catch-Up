module.exports = {
  intro: function(req, res) {
    res.render('pages/index.jade');
  },
  
  main: function(req, res) {
    res.render('pages/main.jade')
  },
  
  about: function(req, res) {
    res.render('pages/about.jade');
  }
}