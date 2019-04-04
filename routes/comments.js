var express= require('express');
var router = express.Router();
var Product = require('../models/product')
var Comment = require('../models/comment');
var middleware =  require('../middleware');


//************************ */
// COMMENT ROUTES
//************************* */

router.post('/comment', middleware.isLoggedIn, function(req, res){
    Comment.create(req.body.comment, function(err, comment){
        if (err){
           return console.log(err)
        }
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        Product.findById(req.body.productId, function(err, product){
            if(err){
              return  console.log(err)
            }
            product.comments.push(comment)
            product.save();
        })
    })
     res.redirect('back');

})

module.exports = router;