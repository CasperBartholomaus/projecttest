//Custom imports
const AuthRouter = require('express').Router();
//Controllers
const registrerController = require("./../controllers/user/register");
const loginLocalController = require('./../controllers/user/login-local');
const loginSocialController = require('./../controllers/user/login-social');
const { getAuthenticationURL } = require('./../controllers/auth/social');

/**
 * Function to check if the user is authenticated
 */
const isAuthenticated = async (req, res, next) => {
    const { type, token } = req.body;
    const isVerified = await verifyUser(type, token);

    if(isVerified) {
        return next();
    }
    //TODO Navigate to not authorized for page, with login button
    next(new Error('User is not authorized for page'));
};

//~~~~~~~~~~~~~~~~~~~~~ LOGIN SOCIAL PAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
AuthRouter.post('/social/login', getAuthenticationURL)

//~~~~~~~~~~~~~~~~~~~~~ REGISTER & LOGIN LOCAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
AuthRouter.post('/local/register', registrerController.registrerUser);
AuthRouter.post('/local/login', loginLocalController.loginLocalUser);

//~~~~~~~~~~~~~~~~~~~~~ LOGIN SOCIAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
AuthRouter.use('/google/callback', loginSocialController.loginSocialUser('google'));
AuthRouter.use('/facebook/callback', loginSocialController.loginSocialUser('facebook'));

//~~~~~~~~~~~~~~~~~~~~~ PROTECTED ROUTES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
AuthRouter.use('/protected', isAuthenticated, (req, res) => {
    res.send('Hallo!!');
});

module.exports = AuthRouter;