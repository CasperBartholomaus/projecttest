//Native imports
const path = require('path');

/**
 * Function that create a start-up log message for each server
 * @param {String} server - name of the server 
 * @param {Object} log - log of the server 
 */
const serverStartupMsg = (server, log) => {
  try {
    // Construct message
    const msg = `Starting: ${server}.
          Using versions: 
          - NodeJS version: ${process.version}.`;
    log.info(msg);
  } catch (err) {
    log.error(err);
  }
};

/**
 * Function that return the root log path for each server
 * @param {String} server - name of the server
 * @returns {String} - absolute path
 */
 const getBasePath = (server) => {
  return path.join(__basedir, 'src', 'server', server, 'log');
}

/**
 * Function that set the file name for each logType
 * @param {String} server - name of the server
 * @param {String} logType - logType: info, error for example
 * @returns {String} - absolute file path
 */
const setLogNames = (server, logType) => {
  if(logType !== 'default') {
      return path.join(getBasePath(server), `${logType}-${server}.log`)
  }

  return path.join(getBasePath(server), `${server}.log`);
}

/**
 * Function that set each logType in object for winston configuration
 * @param {String} server - name of the server 
 * @param {*} logTypes - logType: info, error for example
 * @returns {Object} - All logType with absolute paths for winston configuration
 */
const setLogPaths = (server, logTypes) => {
  const logPath = {};

  logTypes.forEach(logType => {
      logPath[logType] = setLogNames(server, logType);
  })

  return logPath;
}

module.exports = {
  serverStartupMsg,
  getBasePath,
  setLogPaths,
}