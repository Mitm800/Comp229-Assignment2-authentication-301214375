let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Contact = require('../config/models/contacts');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.err(err);
        } else {
            console.log(contactList)
            res.render('contact/contactList', { title: 'Contact List', contactList: contactList })
        }
    })
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contact/add', { title: 'Add Data' });
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = new Contact({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });
    console.log(newContact)
    Contact.create(newContact, (err, Contact) => {
            if (err) {
                return console.err(err);
            } else {
                res.redirect('contact/contactList')
            }
        })
        //res.render('contact/contactList', { title: 'Add' })
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id, (err, contactToEdit) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            console.log(contactToEdit)
            res.render('contact/edit', { title: 'Edit', contact: contactToEdit })
        }
    })
}

module.exports.processEditPage = (req, res, next) => {
    let updateContact = Contact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    })
    console.log(updateContact)
    Contact.updateOne({ _id: id }, updateContact, (err) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            res.redirect('contact/contactList')
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.render(err);
        } else {
            res.redirect('/contactList')
        }
    })
}