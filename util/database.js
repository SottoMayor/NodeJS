const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;


// connecting and storing the connecting into the database
const mongoConnect = (callback) => {

    MongoClient.connect('mongodb+srv://david:davidMongoDB@cluster0.bhiv4.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected!!!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

// return the access to the database, if it exists.
const getDB = () => {
    if(_db){
        return _db;
    }

    throw 'No database found!!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;