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
  order: { type: Number }
});


/**
 * Static functions
 */
VideoSchema.statics = {
  
  addVideo: function(vid) {
    videoList.push(vid);
  },
  
  removeVideo: function(vid) {
    console.log('remove not supported yet.');
  }
}


mongoose.model('Video', VideoSchema);