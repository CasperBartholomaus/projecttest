const { createLogger, format, transports } = require("winston");
const { getConfigByName } = require('./config/log-config');

const Logger = (() => {
  let logger = {};

  const getFormat = (dateFormat) => {
    return format.combine(
      format.timestamp({ format: dateFormat}),
      format.align(),
      format.printf(
        (info) => `[${info.level.toUpperCase()} - ${[info.timestamp]}] :${info.message}`
      )
    )
  };

  function filterOnly(level) {
    return format(function (info) {
      if (info.level === level) {
        return info;
      }
    })();
  }

  const initLogger = (filename) => {
    const logConfig = getConfigByName(filename);
    
    const logFormat = getFormat('MMM-DD-YYYY HH:mm:ss');
    return createLogger({
      transports: [
        new transports.File({
          filename: logConfig.info,
          level: 'info',
          format: format.combine(filterOnly('info'), logFormat), 
        }),
        new transports.File({ 
          filename: logConfig.error, 
          level: 'error',
          format: format.combine(filterOnly('error'), logFormat),
        }),
        new transports.File({ 
          filename: logConfig.default, 
          level: 'info',
          format: logFormat,
        }),
      ],
    });
  }

  return {
    getLogger(id) {
      if (!logger[id]) {
        logger[id] = initLogger(id);
      }
      return logger[id];
    },
  }
})();

module.exports = {
  Logger,
}