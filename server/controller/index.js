/*Mitkumar Malavia, 301214375, 29/10/2021*/
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');

let DB = require('../config/db');

let userModel = require('../models');
let User = userModel.User;

//modules for login, register and other tabs
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', fileName: 'home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About', fileName: 'about', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', fileName: 'project', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', fileName: 'services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact', fileName: 'contact', displayName: req.user ? req.user.displayName : '' });
}


module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('auth/login', {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    } else {
        return res.redirect('/');

    }
}


module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }

                const payload = {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }


                return res.redirect('/contactList');
            });
        })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {

    if (!req.user) {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    } else {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log("Error: Inserting New User");
            if (err.name == "UserExistsError") {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contactList')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}