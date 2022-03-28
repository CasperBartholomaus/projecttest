//Custom imports
const { setLogPaths } = require('../utils/utils-logger');

//VARIABLES
const logTypes = ['default', 'info', 'error'];
const JOB_CONFIG = {
    'server-proxy': {
        name: 'server-proxy',
    },
    'server-auth': {
        name: 'server-auth',
    },
};

//~~~~~~~~~~~~~~~~~~~~~~~~~ SETTERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
/**
 * Function that add the logTypes with absolute path to the JOB_CONFIG
 * @param {String} server - name of the server 
 * @returns {Object} - updated JOB_CONFIG
 */
const setConfig = (server) => {
    const logPath = setLogPaths(server, logTypes);
    const serverConfig = JOB_CONFIG[server];

    Object.keys(logPath).forEach(path => {
        serverConfig[path] = logPath[path];
    });
    
    return serverConfig;
}

// ~~~~~~~~~~~~~~~~~~~~ GETTERS ~~~~~~~~~~~~~~~~~~~~ //
const getConfigByName = (name) => {
    if (typeof name === 'undefined') {
        throw new TypeError('The name when requesting a job configuration should be defined.');
    } else if (!JOB_CONFIG.hasOwnProperty(name)) {
        throw new RangeError(`The supplied name was not known to be a valid job configuration key: ${name}.`);
    }
    return setConfig(name);
};

module.exports = {
    getConfigByName,
};