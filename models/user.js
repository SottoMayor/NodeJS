 const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');

 class User{
    constructor(username, email, cart, id){
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save(){
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString() 
        });
        let newQuantity = 1;
        const updatedCartItems = [... this.cart.items];

        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else{
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity})
        }

        const updatedCart = { items: updatedCartItems };
        const db = getDB();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, {$set: {cart: updatedCart}})

    }

    static findById(userId){
        const db = getDB();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
    }
}

module.exports = User;