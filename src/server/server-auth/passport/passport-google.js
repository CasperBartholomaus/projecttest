const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
        clientID: '426001033013-gflqrul19virmouptiehif4f28jsma15.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'https://localhost:3002/auth/google/callback',
        passReqToCallback: true,
    },
    function(request, accesToken, refreshToken, profile, done) {
        //console.log(profile);
        return done(null, profile);
    }
))

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});