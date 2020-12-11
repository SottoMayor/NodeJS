const { findById } = require('../models/product');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then( ([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      docTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => console.log(err));

};

exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', { product: product, docTitle: 'Details about ' + product.title, path:'/products' })
  });


}

exports.getProducts = (req, res, next) => {

  Product.fetchAll()
  .then( ( [rows, fieldData] ) => {
    res.render('shop/product-list', {
      prods: rows,
      docTitle: 'Shop',
      path: '/products'
    })
  })
  .catch(
    err => console.log(err)
  );

}

exports.getCart = (req, res, next) => {
  Cart.getCart( cart => {
    Product.fetchAll(products =>{
      const cartProducts = [];
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id ===  product.id);
        if(cartProductData){
          cartProducts.push({productData: product, qty: cartProductData.qty })
        }
      }
      res.render('shop/cart', { docTitle: 'Cart Page', path: '/cart', products: cartProducts});
    });
  });
};
  

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  
  findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });

  res.redirect('/cart');

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { docTitle: 'Orders Page', path: '/orders' })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' })
}
