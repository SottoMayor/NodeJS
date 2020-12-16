const path = require('path');
const express = require('express');
const app = express();
const pageNotFound = require('./controllers/page-not-found');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

app.set('view engine','ejs');
app.set('views', 'views');

app.use((req, res, next) =>  {
    User.findById('5fd9ff7fdd7a18b0375f4b46')
    .then( user => { 
    req.user = new User(user.name, user.email, user.cart, user._id);
    next();
    })
    .catch( err => {
        console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(pageNotFound.pageNotFound);


mongoConnect( () => {
    app.listen(3000);     
});