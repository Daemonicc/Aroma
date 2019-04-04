var mongoose = require('mongoose');



var CommentSchema = new mongoose.Schema({
    body: String,
    rely: {type: Boolean, default: false},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    created: {type:  Date, default: Date.now}


})


module.exports = mongoose.model('Comment', CommentSchema)