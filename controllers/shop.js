const Product = require('../models/product');

exports.getIndex = (req, res, next) => {

  Product.find()
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
  Product.findById(prodId)
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

  Product.find()
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
  .populate('cart.items.productId')
  .execPopulate()
  .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', { docTitle: 'Cart Page', path: '/cart', products: products});
    })
  .catch(err => {console.log(err)});

};
  

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then( () => {
    res.redirect('/cart');
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .deleteItemFromCart(prodId)
  .then(result => {
    //console.log(result)
    res.redirect('/cart');
  })
  .catch(err => {console.log(err)})
}

exports.postOrder = (req, res, next) => {
  req.user
  .addOrder()
  .then( () => {
    res.redirect('/orders');
  })
  .catch(err => {console.log(err)})
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(orders => {
    res.render('shop/orders', { docTitle: 'Orders Page', path: '/orders', orders: orders });
  })
  .catch(err => {console.log(err)});
}

