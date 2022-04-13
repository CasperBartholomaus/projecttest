//NPM Packages
const axios = require('axios');
//Custom imports
const { getConfigByName } = require('./config/config-auth');

const getAuthenticationURL = async (req, res) => {
    const { type } = req.body.type;
    const authConfig = getConfigByName(type);
    console.log(`${authConfig.rootUrl}?${new URLSearchParams(authConfig.login_params).toString()}`);
    res.send(`${authConfig.rootUrl}?${new URLSearchParams(authConfig.login_params).toString()}`);
};

const getAuthenticationToken = async (type, code) => {
    const authConfig = getConfigByName(type);
    let result;
    //Set code before get the token
    authConfig.token_params.code = code;

    try {
        const url = authConfig.tokenUrl;
        const params = new URLSearchParams(authConfig.token_params).toString();
        result = type === 'facebook' ? await axios.get(`${url}?${params}`) : await axios.post(url, params);
    }
    catch (err) {
        __log.error(`Error occured getAuthenticationToken() ${type}: ${err}`);
    }
    return result.data;
};

const getAuthenticationUser = async (type, code) => {
    const authConfig = getConfigByName(type);
    let result;
    let token;
    try {
        const data = await getAuthenticationToken(type, code);
        //Set tokens for google
        type === 'google' && (authConfig.userUrl += data.access_token) && (token = data.id_token); 
        //Set tokens for facebook
        type === 'facebook' && (token = data.access_token);
        //Get user info request
        result = await axios.get(authConfig.userUrl, {headers: {Authorization: `Bearer ${token}`}});
    } catch (err) {
        __log.error(`Error occured getUser() ${type}: ${err}`);
    }
    return result.data;
};


module.exports = {
    getAuthenticationURL,
    getAuthenticationUser,
};