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


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
//Optional!
User.hasMany(Product);


sequelize.sync({force: true})
    .then( result => {
    app.listen(3000);
})
    .catch( err => { console.log(err) });
