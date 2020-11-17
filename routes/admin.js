express = require('express');
router = express.Router();

//add-product for GET method
router.get('/add-product',(req, res, next) => {

    res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');

});

//add-product for POST method
router.post('/add-product', (req, res, next) => {

    console.log(req.body);
    res.redirect('/');

});

module.exports = router;