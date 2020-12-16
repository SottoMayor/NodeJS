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
        const updatedCartItems = [...this.cart.items];

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

    getCart(){
        const db = getDB();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products').find({_id: {$in: productIds}})
        .toArray()
        .then(products => {
            return products.map(p => {
                return {
                    ...p, 
                    quantity: this.cart.items.find(i => {
                        return i.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        })
    }

    deleteItemFromCart(productId){
        const updatedCart = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
        })

        const db = getDB();
        return db.collection('users')
        .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: { items: updatedCart }}})
    }

    addOrder(){
        //add a new order and deleting items cart...
        const db = getDB()
        return db.collection('orders').insertOne(this.cart)
        .then(() => {
            this.cart = {items: []};
            return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: { items : [] } } })
        })
    }

    static findById(userId){
        const db = getDB();
        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
    }
}

module.exports = User;