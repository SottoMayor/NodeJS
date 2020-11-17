const { Router } = require('express');

express = require('express');
router = express.Router();

router.get('/',(req, res, next) => {

    res.send('<h2>Hi... HOME page!</h2>');

});

module.exports = router;