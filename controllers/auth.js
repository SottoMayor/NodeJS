const User = require('../models/user');

const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {

    console.log(req.session.isLoggedIn);
    res.render('auth/login', { docTitle: 'Login', path: '/login',
    isAuthenticated: false});
  }

exports.postLogin = (req, res, next) => {

  User.findById('5fde5726e01b330b60a66049')
  .then( user => { 
    req.session.user = user;
    req.session.isLoggedIn = true;
    //res.redirect('/');
    req.session.save( err => {
      console.log(err);
      res.redirect('/');
    })

  })
  .catch( err => {
      console.log(err);
  })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy( err => {
    console.log(err);
    res.redirect('/');
  })
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', { docTitle: 'Signup', path: '/signup', isAuthenticated: false })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({email: email})
  .then( docUser => {
    if(docUser){
      //This user already exists!
      return res.redirect('/signup');
    };

    return bcrypt.hash(password, 12)
    .then( cryptPassword => {
      const user = new User({email: email, password: cryptPassword, cart: {items: []} });
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
    });

  })
  .catch( err => {
    console.log(err);
  });

}