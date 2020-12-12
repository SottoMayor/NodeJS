const path = require('path');
const express = require('express');
const app = express();
const pageNotFound = require('./controllers/page-not-found');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');


app.set('view engine','ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(pageNotFound.pageNotFound);

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync()
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if(!user){
            return User.create({name: 'David', email: 'dummy@test.com'});
        }
        return user;
    })
    .then( user => {
        app.listen(3000);
    })
    .catch( err => { console.log(err) });

