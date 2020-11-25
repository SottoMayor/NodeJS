const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.set('view engine','pug');
app.set('views', 'views');

app.use('/admin',adminData.routes);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

    res.status(404).render('page-not-found', {docTitle: 'Page Not Found'});

});

app.listen(3000);