var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


/**
 * Schema
 */
var VideoSchema = new Schema({
  vid: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
});


/**
 * Static functions
 */
VideoSchema.statics = {
  load: function(callback) {
    this.find({}, {}, function(err, videos) {
      if(err) throw new Error(err.message);
      else {
        videos = videos || [];
        callback(videos);
      }
    });
  },
  
  modify: function(video, callback) {
    this.update({ _id: video.mid }, video, function(err, video) {
      if(err) throw new Error(err.message);
      else {
        callback(video);
      }
    })
  },
  
  discard: function(vid, callback) {
    this.remove({ vid: vid }, function(err) {
      if(err) throw new Error(err.message);
      else {
        callback();
      }
    })
  }
}


mongoose.model('Video', VideoSchema);