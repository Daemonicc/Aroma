var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    firstname: {type: String, default: ''},
    lastname: {type: String ,default: ''},
    email: {type: String, default: ''},
    phone: {type: String, default: ''},
    created: {type:  Date, default: Date.now}

})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)