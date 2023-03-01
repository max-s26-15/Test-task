require('dotenv').config({path: '../../.env'});

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const saveUserData = require('../database/saveUserData');

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: CALLBACK_URL,
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        await saveUserData(profile);

        return done(null, profile);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
