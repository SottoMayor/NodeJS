const User = require('../models/user');

const bcrypt = require('bcryptjs');


exports.getLogin = (req, res, next) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', { docTitle: 'Login', path: '/login', errorMessage: message });
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email!');
        return res.redirect('/login');
      }

      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            })
          };
          req.flash('error', 'Invalid password!');
          return res.redirect('/login');
        })
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
}

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', { docTitle: 'Signup', path: '/signup', errorMessage: message })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(docUser => {
      if (docUser) {
        req.flash('error', 'This user already exists!');
        return res.redirect('/signup');
      };

      return bcrypt.hash(password, 12)
        .then(cryptPassword => {
          const user = new User({ email: email, password: cryptPassword, cart: { items: [] } });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
        });

    })
    .catch(err => {
      console.log(err);
    });

}