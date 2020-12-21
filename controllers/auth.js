exports.getLogin = (req, res, next) => {

    console.log(req.session.isLoggedIn);
    res.render('auth/login', { docTitle: 'Login', path: '/login',
    isAuthenticated: false});
  }

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/')
}