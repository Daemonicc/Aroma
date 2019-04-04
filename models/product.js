var mongoose = require('mongoose');



var ProductSchema = new mongoose.Schema({
    name: String,
    category: {type: String},
    avaliable:{type:  Boolean, default: true},
    quantity: Number,
    bio: {type: String},
    description: {type: String},
    price: String,
    specification: {type: String, default: ''},
    image: {type: String, default: ''},
    brand: {type: String, default: 'generic'},
    color: {type:  String, default: 'generic'},
    wished: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        count: Number
    },
    created: {type:  Date, default: Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]


})


module.exports = mongoose.model('Product', ProductSchema)