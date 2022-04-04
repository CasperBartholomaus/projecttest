//Custom imports
const AuthRouter = require('express').Router();
const { getGoogleAuthURL, signGoogleUser, verifyGoogleUser } = require('./../auth/auth-google');
const { getFacebookAuthURL, verifyFacebookUser, signFacebookUser } = require('./../auth/auth-facebook');

/**
 * Function to check if the user is authenticated
 */
const isAuthenticated = async (req, res, next) => {
    const { token } = req.body;
    const isVerified = await verifyFacebookUser(token);

    if(isVerified) {
        return next();
    }
    //TODO Navigate to not authorized for page, with login button
    next(new Error('User is not authorized for page'));
};

AuthRouter.use('/login', (req, res, next) => {
    //res.redirect(getGoogleAuthURL());
    res.redirect(getFacebookAuthURL());
});

AuthRouter.use('/google/callback', async (req, res, next) => {
    const { code } = req.query;
    const token = await signGoogleUser(code);
    res.send(token);
});

AuthRouter.use('/facebook/callback', async (req, res, next) => {
    const { code } = req.query;
    const user = await signFacebookUser(code);
    console.log("User", user);
    // const token = await signGoogleUser(code);
    res.send(user);
});

// AuthRouter.use('/logout', (req, res, next) => {
//    //req.logOut();
//    //res.redirect("/auth/login");
// });



AuthRouter.use('/protected', isAuthenticated, (req, res) => {
    res.send('Hallo!!');
});

module.exports = AuthRouter;