module.exports = function(app, passport) {

    // first page
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // Profile
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // Logout
    app.get('/logout', function(req, res) {
        req.session.destroy();
        res.redirect('/');
    });

    // Login
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile page
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true 
    }));

    // change not implemented correctly at the moment
    app.get('/change', function(req, res) {
        res.render('changePass.ejs', {
            user : req.user
        });
    });

    app.post('/change', passport.authenticate('local-change', {
        successRedirect : '/profile', 
        failureRedirect : '/change', 
        failureFlash : true 
    }));

    // Sign up
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile pafe
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true 
    }));

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
};
// check is already logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
