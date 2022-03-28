//NPM Modules
const passport = require('passport');
//Custom imports
const AuthRouter = require('express').Router();
require('./../passport/passport-google');

/**
 * Function to check if the user is authenticated
 */
const isAuthenticated = (req, res, next) => {
    if(req.user) {
        next();
    }
    throw new Error(`Not authorized for the page`);
};

AuthRouter.use('/login', (req, res, next) => {
    passport.authenticate('google', {scope: ['email', 'profile']})(req, res, next);
});

AuthRouter.use('/logout', (req, res, next) => {
   req.logOut();
   res.redirect("/auth/login");
});

AuthRouter.use('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/failure',
    })
);

AuthRouter.use('/protected', isAuthenticated, (req, res) => {
    res.send('Hallo!!');
});

module.exports = AuthRouter;