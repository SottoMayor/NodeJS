const path = require('path');
const express = require('express');
const app = express();
const pageNotFound = require('./controllers/page-not-found');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://david:davidMongoDB@cluster0.bhiv4.mongodb.net/shop?retryWrites=true&w=majority';

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})

const User = require('./models/user');

const csrf = require('csurf');
const csrfProtection = csrf();

app.set('view engine','ejs');
app.set('views', 'views');

app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false, store: store})
);

app.use(csrfProtection);

app.use( (req, res, next) => {

    if(!req.session.user){
        return next();
    }

    User.findById(req.session.user._id)
    .then( user => { 
        req.user = user
        next();
    })
    .catch( err => {
        console.log(err);
    })
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next();
})


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(pageNotFound.pageNotFound);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
});