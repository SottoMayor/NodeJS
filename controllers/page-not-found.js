exports.pageNotFound = (req, res, next) => {

    res.status(404).render('page-not-found', {docTitle: 'Page Not Found', path: '/404',
    isAuthenticated: req.session.isLoggedIn});

};