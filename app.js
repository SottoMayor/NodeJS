const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {

    res.send('<h1 style="color:red;"> Oh Oouh... Page not Found! :(( </h1>');

});

app.listen(3000);