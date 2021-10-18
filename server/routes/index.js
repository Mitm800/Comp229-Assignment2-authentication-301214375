/*Mitkumar Malavia, 301214375, 05/10/2021*/
var express = require('express');
var router = express.Router();

/* GET method for all the pages. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home', fileName: 'home' });
});

router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Home', fileName: 'home' });
});

router.get('/about', function(req, res, next) {
    res.render('index', { title: 'About', fileName: 'about' });
});

router.get('/project', function(req, res, next) {
    res.render('index', { title: 'Projects', fileName: 'project' });
});

router.get('/services', function(req, res, next) {
    res.render('index', { title: 'Services', fileName: 'services' });
});

router.get('/contact', function(req, res, next) {
    res.render('index', { title: 'Contact', fileName: 'contact' });
});

module.exports = router;