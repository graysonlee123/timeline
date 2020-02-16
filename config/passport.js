const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.SECRET,
    callbackURL: '/auth/google/redirect'
}, () => {
    console.log('passport callback function fired')
    }
));