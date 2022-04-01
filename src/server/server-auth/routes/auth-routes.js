//Custom imports
const AuthRouter = require('express').Router();
const { getGoogleAuthURL, signGoogleUser, verifyGoogleUser } = require('./../auth/auth-google');

/**
 * Function to check if the user is authenticated
 */
const isAuthenticated = async (req, res, next) => {
    const { token } = req.body;
    const isVerified = await verifyGoogleUser(token);

    if(isVerified) {
        return next();
    }
    //TODO Navigate to not authorized for page, with login button
    next(new Error('User is not authorized for page'));
};

AuthRouter.use('/login', (req, res, next) => {
    res.redirect(getGoogleAuthURL());
});

AuthRouter.use('/google/callback', async (req, res, next) => {
    const { code } = req.query;
    const token = await signGoogleUser(code);
    res.send(token);
});

// AuthRouter.use('/logout', (req, res, next) => {
//    //req.logOut();
//    //res.redirect("/auth/login");
// });



// AuthRouter.use('/protected', isAuthenticated, (req, res) => {
//     res.send('Hallo!!');
// });

module.exports = AuthRouter;