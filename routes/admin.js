const express = require('express');
const router = express.Router();
const path = require('path');

const rootDir = require('../util/path');

//add-product for GET method
router.get('/add-product',(req, res, next) => {

   res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

});

//add-product for POST method
router.post('/add-product', (req, res, next) => {

    console.log(req.body);
    res.redirect('/');

});

module.exports = router;