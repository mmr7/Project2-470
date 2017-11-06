// all the things needed to start the login page
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;  // use port 8080
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// connect the database
mongoose.connect('mongodb://localhost/login'); // connect to my database

require('./config/passport')(passport); // pass passport for configuration

app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs, easier to use

// required for passport
app.use(session({
    secret: 'sesh', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); 

app.listen(port);
console.log('Running on Port:  ' + port); //port
