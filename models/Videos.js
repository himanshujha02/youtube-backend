const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  id: Number,
  title: String,
  channel: String,
  views: String,
  timestamp: String,
  thumbnail: String,
  category: String,
  subscribed:Boolean,
  liked:Boolean,
});

const VideoModel = mongoose.model('Video', videoSchema);
module.exports=VideoModel

 