var express= require('express');
var router = express.Router();
var User  = require('../models/user');
var middleware =  require('../middleware');


// ************************
//       USER ROUTES
//************************ */


//*********show User************ */
router.get('/user/:id',middleware.isLoggedIn, (req, res) => {
    User.findById(req.params.id, function(err, founduser){
        if(err){
            console.log(err.message)
        }else{
            res.render('user/profile', {user: founduser});
        }
    })
    

});

//**************Edit User************ */
router.get('/user/:id/edit',middleware.isLoggedIn , (req, res) => {
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            return console.log(err.message)
        }
        res.render('user/edit', {user: foundUser});
    })
    

});

//************UPDATE USER*********** */
router.put('/user/:id',middleware.isLoggedIn, (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            console.log(err.message)
        }else{
             res.redirect('/user/' +req.params.id);
        }
    })
    
})


module.exports = router;
