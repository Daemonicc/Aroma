var express= require('express');
var router = express.Router();
var passport = require('passport');
var User  = require('../models/user');
var Product = require('../models/product');
var Cart = require('../models/cart')
var Comment = require('../models/comment');
var middleware =  require('../middleware');
const { check, validationResult } = require('express-validator/check');


router.get('/',middleware.isLoggedIn, function(req, res){
    Product.find({})
            .limit(8)
            .exec(function(err, product){
                res.render('index', {product: product})
            })
})



router.get('/register', function(req,res){
    res.render('auth/register')
})
router.post('/register', [
    // username must be string
    check('username').isString().trim().escape(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ], function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/')
        })
    })
})



router.get('/login', function(req,res){
    res.render('auth/login')
})


router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'
}) , function(req,res){
});

router.get('/logout', (request, response) => {
    request.logout();
    response.redirect('/');
});


module.exports = router;
