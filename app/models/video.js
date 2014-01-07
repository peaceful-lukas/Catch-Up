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
  order: { type: Number, default: 0 }
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
  }
}


mongoose.model('Video', VideoSchema);