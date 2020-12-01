const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      docTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getProduct = (req, res, next) => {

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', { product: product, docTitle: 'Details about ' + product.title, path:'/products' })
  });


}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'Shop',
      path: '/products'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { docTitle: 'Cart Page', path: '/cart' })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { docTitle: 'Orders Page', path: '/orders' })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' })
}
