var express =  require('express');
var passport = require('passport');
var User = require('./models/user');
var localStrategy = require('passport-local');
var methodOverride = require('method-override');
var seedDB = require('./seed')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// seedDB();
var  authRoute = require('./routes/index'),
      userRoute = require('./routes/users');
      commentRoute = require('./routes/comments');
      productRoute = require('./routes/products');
      cartRoute = require('./routes/cart');





var app  = express();
app.use(express.static(__dirname  + '/public'))
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://Diane:mamma@cluster0-yajnl.mongodb.net/aroma?retryWrites=true', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// *******************
//    PASSPORT CONFIG
// ********************
app.use(require('express-session')({
  secret: 'Best friend',
  resave: false,
  saveUninitialized: false
}))

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  //Constants

  app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
  })
  


  app.use(authRoute);
  app.use(userRoute);
  app.use(commentRoute);
  app.use(productRoute);
  app.use(cartRoute);

  app.get('*', function(req, res){
    res.render('404');
})

app.listen(process.env.PORT || 8080, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
 });