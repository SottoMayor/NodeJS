const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');
const User = require('../models/user');

router.get('/login', authController.getLogin);

router.post('/login',[

    body('email', 'Please enter a valid email!!!').isEmail().normalizeEmail(),
    body('password', 'Incorrect password!').isLength({min: 6}).isAlphanumeric().trim()
    
], authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup', 
[
    check('email').isEmail().withMessage('Please enter a valid email!')
    .custom((value, {req}) => {
       return User.findOne({ email: value })
       .then(docUser => {
         if (docUser) {
           return Promise.reject('This email already exists!')
         };
        })
    }).normalizeEmail(),
    body('password', 'Please enter a password with only number and text and at leaste 5 characters')
    .isLength({min: 6}).isAlphanumeric().trim(),
    body('confirmPassword')
    .trim()
    .custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('The passwords have to match!');
        }
        return true;
    })

],
authController.postSignup);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;