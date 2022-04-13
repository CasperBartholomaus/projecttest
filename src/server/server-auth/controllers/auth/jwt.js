const jwt = require('jsonwebtoken');
const { getAuthenticationUser } = require('./../auth/social');
const { getConfigByName } = require('./config/config-auth');

const signUser = async (authType, userData) => {
    let result;
    try {
        const authConfig = getConfigByName(authType);
        //Get user data from social platforms, if userData has a code
        if('code' in userData) {
            userData = await getAuthenticationUser(authType, userData);
        }
    
        result = jwt.sign({id: userData.name}, authConfig.jwtSecret);
    } catch (err) {
        __log.error(`Error occured signUser() ${authType}: ${err}`);
    }
    return result;
}

const verifyUser = async (authType, token) => {
    let result;
    try {
        const authConfig = authType && getConfigByName(authType);
        result = jwt.verify(token, authConfig.jwtSecret);
    } catch (err) {
        __log.error(`Error occured verifyUser() ${authType}: ${err}`);
    }
    return result;
}

module.exports = {
    signUser,
    verifyUser,
}