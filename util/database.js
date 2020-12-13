const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://david:davidMongoDB@cluster0.bhiv4.mongodb.net/NodeJs-teste?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected!!!');
        callback(result);
    })
    .catch(err => {console.log(err)});
};

module.exports = mongoConnect;