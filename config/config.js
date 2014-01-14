module.exports = {
  development: {
    db: {
      host: 'mongodb://192.168.0.25/catchup-dev' // 로컬서버.
    },
    root: require('path').normalize(__dirname + '/..')
  },
  
  production: {
    db: {
      host: 'mongodb://localhost/catchup-dev'
    },
    root: require('path').normalize(__dirname + '/..')
  }
}