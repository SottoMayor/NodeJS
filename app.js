const path = require('path');
const express = require('express');
const app = express();
const pageNotFound = require('./controllers/page-not-found');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images'); 
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

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

const flash = require('connect-flash');

const csrf = require('csurf');
const csrfProtection = csrf();

app.set('view engine','ejs');
app.set('views', 'views');

app.use(
    session({secret: 'my secret', resave: false, saveUninitialized: false, store: store})
);

app.use(csrfProtection);
app.use(flash());


app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next();
})

app.use( (req, res, next) => {

    if(!req.session.user){
        return next();
    }

    User.findById(req.session.user._id)
    .then( user => {
        if(!user){
            return next();
        } 
        req.user = user
        next();
    })
    .catch( err => {
        next(new Error(err))
    })
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/500', pageNotFound.pageError)
app.use(pageNotFound.pageNotFound);

app.use((error, req, res, next) => {
    res.status(500).render('page-error', {docTitle: 'Error!', path: '/500',
    isAuthenticated: req.session.isLoggedIn});
}) 


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
});