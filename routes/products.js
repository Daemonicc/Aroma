var express= require('express');
var router = express.Router();
var Product  = require('../models/product');


//************************
//    PRODUCT ROUTES
//************************

router.get('/product/new', function(req, res){
    res.render('product/new')
});


router.post('/product', (req, res) => {
    Product.create(req.body.product, function(err, product){
        if (err){
            console.log(err.message)
            return  res.redirect('back');
        }
        console.log(req.body.product)
         res.redirect('/product');
    })
    

});

router.get('/product/view/:productId', function(req, res){
    Product.findById(req.params.productId).populate('comments').exec(function(err, foundProduct){
        if (err){
           return console.log(err)
        }
         res.render('product/single',  {product: foundProduct});
    })
    
})


router.get('/product/:page', (req, res) => {
    var sets = 9;
    var  page = req.params.page || 1;

    if (req.param('category')){
        Product.find({category: req.param('category')})
        .skip((sets *  page) - sets)
         .limit(sets)
         .exec(function(err, products){
             Product.count().exec(function(err, count){
                if(err){
                return console.log(err.message)
            }
            var checked = req.param('category')
            res.render('product/show',{products: products, checked: checked, current:page, pages: Math.ceil(count/sets)})
             })
            
        })
    }else{
         Product.find({})
         .skip((sets *  page) - sets)
         .limit(sets)
         .exec(function(err, allproduct){
             Product.count().exec(function(err, count){
                if(err){
                    return(console.log(err.message))
                }
                res.render('product/show', {products: allproduct, current:page, pages: Math.ceil(count/sets)} )
             })
        
    })
    }
   
    

});








module.exports  =  router;