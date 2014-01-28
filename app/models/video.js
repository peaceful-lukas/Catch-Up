var sqlite3 = require('sqlite3').verbose();
var fs     = require('fs');

var file = require('path').normalize(__dirname + '../../../db/video.db');
var db = new sqlite3.Database(file);

module.exports = {
  
  init: function() {
    var exists = fs.existsSync(file);
    
    db.serialize(function() {
      if( !exists ) {
        db.run('CREATE TABLE video ( _id INTEGER PRIMARY KEY AUTOINCREMENT, youtubeVideoId TEXT, title TEXT, url TEXT, thumbnail TEXT )');
        console.log('video db created!');
      }
      else {
        
      }
    });
  },
  
  load: function(callback) {
    var videos = [];
    
    db.serialize(function() {
      db.each('SELECT * FROM video ORDER BY _id DESC', function(err, row) {
        if(err) throw new Error(err.message);
        else {
          row.vid = row.youtubeVideoId;
          delete row.youtubeVideoId;
          
          videos.push(row);
        } 
      }, function(err, numRows) {
        if(err) throw new Error(err.message);
        else {
          callback(videos);
        }
      });
    });
  },
  
  save: function(video, callback) {
    db.serialize(function() {
      var stmt = db.prepare('INSERT INTO video ( youtubeVideoId, title, url, thumbnail ) VALUES (?, ?, ?, ?)');
      stmt.run(video.vid, video.title, video.url, video.thumbnail);
      stmt.finalize();
      
      callback();
    });
  },
  
  modify: function(video, callback) {
    db.serialize(function() {
      var stmt = db.prepare('UPDATE video SET youtubeVideoId = ?, title = ?, url = ?, thumbnail = ? WHERE _id = ?');
      stmt.run(video.vid, video.title, video.url, video.thumbnail, video.mid);
      stmt.finalize();
      
      callback();
    });
  },
  
  discard: function(id, callback) {
    db.serialize(function() {
      var stmt = db.prepare('DELETE FROM video WHERE _id = ?');
      stmt.run(id);
      stmt.finalize();
      
      callback();
    });
  }
}





// var mongoose = require('mongoose');
// var Schema   = mongoose.Schema;


// /**
//  * Schema
//  */
// var VideoSchema = new Schema({
//   vid: { type: String, required: true },
//   title: { type: String, required: true },
//   url: { type: String, required: true },
//   thumbnail: { type: String, required: true },
// });


// /**
//  * Static functions
//  */
// VideoSchema.statics = {
//   load: function(callback) {
//     this.find({}, {}, function(err, videos) {
//       if(err) throw new Error(err.message);
//       else {
//         videos = videos || [];
//         callback(videos);
//       }
//     });
//   },
  
//   modify: function(video, callback) {
//     this.update({ _id: video.mid }, video, function(err, video) {
//       if(err) throw new Error(err.message);
//       else {
//         callback(video);
//       }
//     })
//   },
  
//   discard: function(vid, callback) {
//     this.remove({ vid: vid }, function(err) {
//       if(err) throw new Error(err.message);
//       else {
//         callback();
//       }
//     })
//   }
// }


// mongoose.model('Video', VideoSchema);