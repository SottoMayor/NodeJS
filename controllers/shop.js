const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {

  Product.findAll()
  .then( products => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => console.log(err));

};

exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then( product => {
    res.render('shop/product-detail', 
    { product: product, 
      docTitle: 'Details about ' + product.title, 
      path:'/products' 
    })
  })
  .catch(err => console.log(err));

};

exports.getProducts = (req, res, next) => {

  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Shop',
      path: '/products'
    })
  })
  .catch(
    err => console.log(err)
  );
}

exports.getCart = (req, res, next) => {

  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts()
    .then( products => {
      res.render('shop/cart', { docTitle: 'Cart Page', path: '/cart', products: products});
    })
    .catch(err => {console.log(err)});
  })
  .catch(err => {console.log(err)});

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
