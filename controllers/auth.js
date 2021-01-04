const User = require('../models/user');

const crypto = require('crypto');

const bcrypt = require('bcryptjs');

const sendgridMailer = require('@sendgrid/mail');

sendgridMailer.setApiKey('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');

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

          const message = {
            to: email,
            from: 'ddsmmf@gmail.com', // this email must be the SAME of SENDGRID!!!!!
            subject: 'Signup succeeded!',
            text: 'some text here!',
            html: `
            <h1> You successfully sign up! </h1>
            <p> Thank you son! </p>
            `
          }

          sendgridMailer.send(message)
          .then( result => {
            console.log('Email Sent')
          })
          .catch(err => {
            console.log(err)
          })

        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });

}

exports.getReset = (req, res, next) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', 
  {
    docTitle: 'Reset Password',
    path: '/reset',
    errorMessage: message
  })

}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err)
      res.redirect('/reset');
    }

    const email = req.body.email
    const token = buffer.toString('hex');
    User.findOne({email: email})
    .then(user => {
      if(!user){
        req.flash('error', 'No account with this email found!');
        return res.redirect('/reset');
      }
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save();
    })
    .then(result => {
      
      res.redirect('/login');

      const message = {
        to: email,
        from: 'ddsmmf@gmail.com', // this email must be the SAME of SENDGRID!!!!!
        subject: 'Password reset',
        text: 'some text here!',
        html: `
        <h1> You requested a password reset </h1>
        <p> Click this <a href="http://localhost:3000/reset/${token}">LINK</a> to set a new password. </p>
        `
      }

      sendgridMailer.send(message)
      .then( result => {
        console.log('Email Sent')
      })
      .catch(err => {
        console.log(err)
      })

    })
    .catch(err => {
      console.log(err);
    });    

  })
}

exports.getNewPassword = (req, res, next) => {
  
  const token = req.params.token;
  User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now() }})
  .then(user => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/new-password', 
    {
      docTitle: 'New Password',
      path: '/new-password',
      errorMessage: message,
      userId: user._id.toString(),
      passwordToken: token
    })
  })
  .catch(err => {
    console.log(err);
  })

}

exports.postNewPassword = (req, res, next) => {
  const email = req.body.email;
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}, _id: userId})
  .then( user => {
    resetUser = user;
    return bcrypt.hash(newPassword, 12);
  })
  .then(cryptPassword => {
    resetUser.password = cryptPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    return resetUser.save();
  })
  .then(() => {
    res.redirect('/login');

    const message = {
      to: email,
      from: 'ddsmmf@gmail.com', // this email must be the SAME of SENDGRID!!!!!
      subject: 'Password reset succesfully!',
      text: 'some text here!',
      html: `
      <h1> Password reset succesfully!</h1>
      <p> click <a href='http://localhost:3000/login' > here </a>  to access the page! </p>
      `
    }

    sendgridMailer.send(message)
    .then( result => {
      console.log('Email Sent')
    })
    .catch(err => {
      console.log(err)
    })

  })
}