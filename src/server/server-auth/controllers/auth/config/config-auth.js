// ~~~~~~~~~~~~~~~~~~~~ AUTH CONFIG ~~~~~~~~~~~~~~~~~~~~ //
console.log(process.env.FACEBOOK_CLIENT_ID);

const AUTH_CONFIG = {
    'facebook': {
        name: 'facebook',
        rootUrl: 'https://www.facebook.com/v13.0/dialog/oauth',
        login_params: {
            client_id: process.env.FACEBOOK_CLIENT_ID,
            redirect_uri: `https://localhost:3002/auth/facebook/callback`,
            state: process.env.facebook_client_secret
        },
        tokenUrl: 'https://graph.facebook.com/v13.0/oauth/access_token',
        token_params: {
            client_id: process.env.facebook_client_id,
            redirect_uri: `https://localhost:3002/auth/facebook/callback`,
            client_secret: process.env.facebook_client_secret,
            code: '', 
        },
        userUrl: 'https://graph.facebook.com/me',
        jwtSecret:  process.env.FACEBOOK_JWT_SECRET,
    },
    'google': {
        name: 'google',
        rootUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        login_params: {
            redirect_uri: `https://localhost:3002/auth/google/callback`,
            client_id: process.env.google_client_id,
            access_type: 'offline',
            response_type: 'code',
            prompt: 'consent',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
            ].join(' '),
        },
        tokenUrl: 'https://accounts.google.com/o/oauth2/token',
        token_params: {
            code: '',
            client_id: process.env.client_id,
            client_secret: process.env.google_client_secret,
            redirect_uri: `https://localhost:3002/auth/google/callback`,
            grant_type: "authorization_code",
        },
        userUrl: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=`,
        jwtSecret: process.env.GOOGLE_JWT_SECRET
    },
    'local': {
        name: 'local',
        jwtSecret: process.env.LOCAL_JWT_SECRET,
    },
};

// ~~~~~~~~~~~~~~~~~~~~ GETTERS ~~~~~~~~~~~~~~~~~~~~ //
const getConfigByName = (name) => {
    if (typeof name === 'undefined') {
        throw new TypeError('The name when requesting a job configuration should be defined.');
    } else if (!AUTH_CONFIG.hasOwnProperty(name)) {
        throw new RangeError(`The supplied name was not known to be a valid job configuration key: ${name}.`);
    }
    return AUTH_CONFIG[name];
};

const getAllConfigs = () => AUTH_CONFIG;

module.exports = {
    getConfigByName,
    getAllConfigs,
};