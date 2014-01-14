module.exports = {
  development: {
    db: {
      host: 'mongodb://192.168.10.145/catchup-dev' // 로컬서버.
    },
    root: require('path').normalize(__dirname + '/..')
  },
  
  production: {
    db: {
      host: 'mongodb://heroku_app21208894:n67c2mbl0n8f9oucum84ngm43r@ds061248.mongolab.com:61248/heroku_app21208894'
    },
    root: require('path').normalize(__dirname + '/..')
  }
}