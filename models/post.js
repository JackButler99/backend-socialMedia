const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  message: {type: String, required: true},
  creator: {type: String},
  creator_id: {type: String}, 
  tags: [String],
  selectedFile: {type: String}, 
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
})

const Post = mongoose.model('Post', postSchema)

module.exports = ('post', Post)