const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
   title: { type: String },
   message: { type: String }  
}, { timestamps: true })

const Post = mongoose.model('posts', postSchema)

module.exports = Post