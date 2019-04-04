var mongoose = require('mongoose');



var CartSchema = new mongoose.Schema({
    quantity: {type: Number,  default: 1},
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    created: {type:  Date, default: Date.now},
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

})


module.exports = mongoose.model('Cart', CartSchema)