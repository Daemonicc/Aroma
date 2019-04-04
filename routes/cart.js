var express= require('express');
var router = express.Router();
var Product  = require('../models/product');
var Cart =  require('../models/cart')
var middleware =  require('../middleware');


//*************************** */
// CART ROUTES
router.post('/cart',middleware.isLoggedIn, function(req, res){
    Product.findById(req.body.productId, function(err, product){
        if (err){
           return console.log(err)
        }
        Cart.create(req.body.cart, function(err, cart){
            if (err){
                return console.log(err)
            }
            cart.user.id = req.user.id;
            cart.user.username = req.user.username;
            cart.products.push(product);
            cart.save();
        })
    })
     res.redirect('back');
        
});
router.get('/cart/:userId', middleware.isLoggedIn, function(req, res){
    Cart.find({"user.id": req.params.userId }).populate('products').exec(function(err, foundcart){
        if(err){
            console.log(err.message)
        }else{
            res.render('cart/show', {cart: foundcart});
        }
    })
    
})

module.exports =  router;