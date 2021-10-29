/*Mitkumar Malavia, 301214375, 29/10/2021*/
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Contact = require('../models/contacts');

let contactController = require('../controller/contact')

//route file for contact CRUD operations

router.get('/', contactController.displayContactList);

router.get('/add', contactController.displayAddPage);

router.post('/add', contactController.processAddPage);


router.get('/edit/:id', contactController.displayEditPage);

router.post('/edit/:id', contactController.processEditPage);

router.get('/delete/:id', contactController.performDelete);

module.exports = router;