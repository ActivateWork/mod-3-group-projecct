const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    user: { type: String }
}) 

const User = mongoose.model('users', userSchema)

module.exports = User