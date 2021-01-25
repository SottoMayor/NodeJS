exports.pageNotFound = (req, res, next) => {

    res.status(404).render('page-not-found', {docTitle: 'Page Not Found', path: '/404',
    isAuthenticated: req.session.isLoggedIn});

};


exports.pageError = (req, res, next) => {

    res.status(500).render('page-error', {docTitle: 'Error!', path: '/500',
    isAuthenticated: req.session.isLoggedIn});

};

