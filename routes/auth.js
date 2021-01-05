const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', 
[
    check('email').isEmail().withMessage('Please enter a valid email!')
    .custom((value, {req}) => {
        if(value === 'test@test.com'){
            throw new Error('This email is forbidden!!!');
        }
        return true;
    }),
    body('password', 'Please enter a password with only number and text and at leaste 5 characters')
    .isLength({min: 6}).isAlphanumeric()

],
authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;