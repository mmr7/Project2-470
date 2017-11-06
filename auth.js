// for facebook, had to go to the facebook developers website to get the client and secret ids.
module.exports = {

    'facebookAuth' : {
        'clientID'        : '235825623619357', 
        'clientSecret'    : '6c983b22c2da7a56ddca4b918756ac58', 
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    }
};
