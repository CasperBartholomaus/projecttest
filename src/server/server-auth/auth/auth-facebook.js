//NPM Packages
const axios = require('axios');
const jwt = require('jsonwebtoken');

const getFacebookAuthURL = () => {
    const rootUrl = 'https://www.facebook.com/v13.0/dialog/oauth';
    const options = {
        client_id: process.env.facebook_client_id,
        redirect_uri: `https://localhost:3002/auth/facebook/callback`,
        state: process.env.facebook_client_secret
    };
    return `${rootUrl}?${new URLSearchParams(options).toString()}`;
};

const getFacebookToken = async (code) => {
    const rootUrl = 'https://graph.facebook.com/v13.0/oauth/access_token';
    const values = {
        client_id: process.env.facebook_client_id,
        redirect_uri: `https://localhost:3002/auth/facebook/callback`,
        client_secret: process.env.facebook_client_secret,
        code, 
    };
    let result;

    try {
        result = await axios.get(`${rootUrl}?${new URLSearchParams(values).toString()}`);
    }
    catch (err) {
        __log.error(`Error occured getFacebookToken(): ${err}`);
    }
    return result.data;
};

const getFacebookUser = async (code) => {
    let result;
    try {
        const token = await getFacebookToken(code);
    const url = `https://graph.facebook.com/me`;
        result = await axios.get(url, {headers: {Authorization: `Bearer ${token.access_token}`}});
    } catch (err) {
        __log.error(`Error occured getFacebookUser(): ${err}`);
    }
    return result.data;
};

const signFacebookUser = async (code) => {
    let userProfile;
    try {
        userProfile = await getFacebookUser(code);
        __log.info(`User ${userProfile.name} have received a jwt`);
    } catch (err) {
        __log.error(`Error occured signFacebookUser(): ${err}`);
    }
    return jwt.sign(userProfile, process.env.FACEBOOK_JWT_SECRET);
}

const verifyFacebookUser = async (token) => {
    let result;
    try {
        result = jwt.verify(token, process.env.FACEBOOK_JWT_SECRET);
    } catch (err) {
        __log.error(`Error occured verifyFacebookUser(): ${err}`);
    }
    return result;
}

module.exports = {
    getFacebookAuthURL,
    signFacebookUser,
    verifyFacebookUser,
};