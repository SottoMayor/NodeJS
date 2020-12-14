 const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');

 class User{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    save(){
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    static findById(userId){
        const db = getDB();
        //return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next(); OR...
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
    }
}

module.exports = User;