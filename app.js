const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {

    res.status(404).sendFile(path.join(__dirname, 'views', 'page-not-found.html'));

});

app.listen(3000);