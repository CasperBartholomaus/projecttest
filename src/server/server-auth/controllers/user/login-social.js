//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PACKAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
const { signUser } = require('./../auth/jwt')

/**
 * 
 * @param {*} authType 
 * @returns 
 */
const loginSocialUser = async (authType) => {
    return async (req, res, next) => {
        try {
            const { code } = req.query;
            const user = await signUser(authType, {code});
            res.send(user);
        }
        catch (error) {
            next(error)
        }
    } 
};

module.exports = {
    loginSocialUser,
}
