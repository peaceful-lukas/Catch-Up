var sqlite3 = require('sqlite3').verbose();
var fs     = require('fs');

var file = 'db/showreel.db';
var db = new sqlite3.Database(file);

module.exports = {
  
  init: function() {
    var exists = fs.existsSync(file);
    
    db.serialize(function() {
      if( !exists ) {
        db.run('CREATE TABLE showreel ( _id INTEGER PRIMARY KEY AUTOINCREMENT, youtubeVideoId TEXT, title TEXT, url TEXT, thumbnail TEXT )');
        console.log('showreel db created!');
      }
      else {
        
      }
    });
  },
  
  load: function(callback) {
    var showreel = null;
    
    db.serialize(function() {
      db.each('SELECT * FROM showreel', function(err, row) {
        if(err) throw new Error(err.message);
        else {
          row.vid = row.youtubeVideoId;
          delete row.youtubeVideoId;
          
          showreel = row;
        } 
      }, function(err, numRows) {
        if(err) throw new Error(err.message);
        else {
          if( typeof callback === 'function' ) {
            callback(showreel);
          }
        }
      });
    });
  },
  
  save: function(showreel, callback) {
    db.serialize(function() {
      var stmt = db.prepare('INSERT INTO showreel ( youtubeVideoId, title, url, thumbnail ) VALUES (?, ?, ?, ?)');
      stmt.run(showreel.vid, showreel.title, showreel.url, showreel.thumbnail);
      stmt.finalize();
      
      if( typeof callback === 'function') {
        callback();
      }
    });
  },
  
  modify: function(showreel, callback) {
    db.serialize(function() {
      var stmt = db.prepare('UPDATE showreel SET youtubeVideoId = ?, title = ?, url = ?, thumbnail = ? WHERE _id = ?');
      stmt.run(showreel.vid, showreel.title, showreel.url, showreel.thumbnail, showreel.mid);
      stmt.finalize();
      
      if( typeof callback === 'function') {
        callback();
      }
    });
  },
  
  discard: function(id, callback) {
    db.serialize(function() {
      var stmt = db.prepare('DELETE FROM showreel WHERE _id = ?');
      stmt.run(id);
      stmt.finalize();
      
      if( typeof callback === 'function') {
        callback();
      }
    });
  }
}