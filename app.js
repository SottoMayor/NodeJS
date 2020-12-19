const path = require('path');
const express = require('express');
const app = express();
const pageNotFound = require('./controllers/page-not-found');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const mongoose = require('mongoose');

const User = require('./models/user');

app.set('view engine','ejs');
app.set('views', 'views');


app.use((req, res, next) =>  {
    User.findById('5fde5726e01b330b60a66049')
    .then( user => { 
    req.user = user;
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


mongoose.connect('mongodb+srv://david:davidMongoDB@cluster0.bhiv4.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {

    User.findOne().then( user => {
        if (!user){
            const user = new User({
                name: 'David',
                email: 'david@teste.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })

    app.listen(3000)
})
.catch((err) => {
    console.log(err)
});