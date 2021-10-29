/*Mitkumar Malavia, 301214375, 29/10/2021*/
let mongoose = require('mongoose');


//collection to model for contact list
let contactModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String
}, {
    collection: "contacts"
});

module.exports = mongoose.model('Contacts', contactModel);