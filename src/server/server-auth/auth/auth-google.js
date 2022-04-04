//NPM Packages
const axios = require('axios');
const jwt = require('jsonwebtoken');

const getGoogleAuthURL = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: `https://localhost:3002/auth/google/callback`,
        client_id: process.env.google_client_id,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    };
    return `${rootUrl}?${new URLSearchParams(options).toString()}`;
};

const getGoogleToken = async (code) => {
    let result;
    const url = "https://accounts.google.com/o/oauth2/token";
    const values = {
        code,
        client_id: process.env.client_id,
        client_secret: process.env.google_client_secret,
        redirect_uri: `https://localhost:3002/auth/google/callback`,
        grant_type: "authorization_code",
    };
    const params = new URLSearchParams(values).toString();

    try {
        result = await axios.post(url, params);
    }
    catch (err) {
        __log.error(`Error occured getTokens(): ${err}`);
    }
    return result.data;
}

const getGoogleUser = async (code) => {
    let result;
    const token = await getGoogleToken(code);
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.access_token}`;

    try {
        result = await axios.get(url, {headers: {Authorization: `Bearer ${token.id_token}`}});
    } catch (err) {
        __log.error(`Error occured getGoogleUser(): ${err}`);
    }
    return result.data;
};

const signGoogleUser = async (code) => {
    let userProfile;
    try {
        userProfile = await getGoogleUser(code);
        __log.info(`User ${userProfile.given_name} have received a jwt`);
    } catch (err) {
        __log.error(`Error occured signGoogleUser(): ${err}`);
    }
    
    return jwt.sign(userProfile, process.env.GOOGLE_JWT_SECRET);
}

const verifyGoogleUser = async (token) => {
    let result;
    try {
        result = jwt.verify(token, process.env.GOOGLE_JWT_SECRET);
    } catch (err) {
        __log.error(`Error occured verifyGoogleUser(): ${err}`);
    }
    return result;
}

module.exports = {
    getGoogleAuthURL,
    signGoogleUser,
    verifyGoogleUser,
}