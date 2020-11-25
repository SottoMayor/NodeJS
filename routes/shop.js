const express = require('express');
const router = express.Router();
const path = require('path');
const { title } = require('process');

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get('/',(req, res, next) => {

    const products = adminData.products;

    res.render('shop', {prods: products, docTitle: 'Shop Page'});

});

module.exports = router;