/*Mitkumar Malavia, 301214375, 29/10/2021*/
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


//model for user authentication
let User = mongoose.Schema({
        username: {
            type: String,
            default: '',
            trime: true,
            required: 'username is required'
        },
        email: {
            type: String,
            default: '',
            trime: true,
            required: 'email is required'
        },
        displayName: {
            type: String,
            default: '',
            trime: true,
            required: 'displayName is required'
        },
        created: {
            type: Date,
            default: Date.now
        },

        update: {
            type: Date,
            default: Date.now
        }
    }, {
        collection: "users"
    }


);

let options = ({ missingPasswordError: 'Wrong/Missing password' });
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);