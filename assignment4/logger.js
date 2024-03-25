const { DateTime } = require('luxon');
const { createLogger, transports, format } = require('winston');

const logFormat = (info) => {
    const { level, message } = info;
    const dateFormat = DateTime.now().toUTC().toISO();
    const location = 'Fremont'
    return `location: ${location} time: ${dateFormat} level: ${level} message: ${message}`;
};

const getLoggerInstance = () => {
    const logger = createLogger({
        level: 'info',
        format: format.combine(
            format.colorize(),
            format.json(),
            format.printf(logFormat)
        ),
        transports: [
            new transports.Console()
        ]
    });
    return logger;
};

module.exports = {
    getLoggerInstance
};