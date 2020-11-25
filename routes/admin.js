const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

const products = [];

//add-product for GET method
router.get('/add-product',(req, res, next) => {

   res.render('add-product', {docTitle: 'Add product', path:'/admin/add-product'});

});

//add-product for POST method
router.post('/add-product', (req, res, next) => {

    products.push({title: req.body.title})
    res.redirect('/');

});

exports.routes = router;
exports.products = products;