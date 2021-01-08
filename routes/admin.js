const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-Auth');
const {body} = require('express-validator')


router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', [
    body('title').isString().isLength({min: 3}).trim(),
    body('price').isFloat(),
    body('description').isLength({min: 3, max: 400}).trim()
], isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title').isString().isLength({min: 3}).trim(),
    body('price').isFloat(),
    body('description').isLength({min: 3, max: 400}).trim()
], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);




module.exports = router;
