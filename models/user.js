const getDB = require('../util/database').getDB;
const mongodb = require('mongodb');

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id;
    }

    save() {
        const db = getDB();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {

        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity })
        }

        const updatedCart = { items: updatedCartItems };
        const db = getDB();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } })

    }

    getCart() {
        const db = getDB();
        const productIds = this.cart.items.map(i => {
            return i.productId;
        });
        return db.collection('products').find({ _id: { $in: productIds } })
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

    deleteItemFromCart(productId) {
        const updatedCart = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
        })

        const db = getDB();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCart } } })
    }

    addOrder() {
        const db = getDB()
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name
                }
            }
            return db.collection('orders').insertOne(order)
        })
            .then(() => {
                this.cart = { items: [] };
                return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) },
                    { $set: { cart: { items: [] } } })
            })
    }

    getOrders() {
        const db = getDB();
        return db.collection('orders').find( { 'user._id': new mongodb.ObjectId(this._id) } ).toArray();
    }

    static findById(userId) {
        const db = getDB();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
    }
}

module.exports = User;