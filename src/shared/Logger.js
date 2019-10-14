export const ERROR = 1;
export const WARN = 2;
export const INFO = 3;
export const DEBUG = 4;

export class Logger {
    constructor(logLevel, prefix = "F1TV Tweaks") {
        this.logLevel = logLevel;
        this.prefix = prefix;
    }

    /**
     * Log an error.
     *
     * @param {String} message The message to log.
     */
    error(message) {
        this.log(ERROR, message);
    }

    /**
     * Log a warning.
     *
     * @param {String} message The message to log.
     */
    warn(message) {
        this.log(WARN, message);
    }

    /**
     * Log information.
     *
     * @param {String} message The message to log.
     */
    info(message) {
        this.log(INFO, message);
    }

    /**
     * Log a debug message.
     *
     * @param {String} message The message to log.
     */
    debug(message) {
        this.log(DEBUG, message);
    }

    /**
     * Log a message to the console if the given {@see logLevel} is not greater
     * than {@see this.logLevel}.
     *
     * @param {Number} logLevel The log level of the message to log.
     * @param {String} message The message to log.
     */
    log(logLevel, message) {
        if (logLevel <= this.logLevel) {
            console.log(`[${this.prefix}] ${message}`);
        }
    }
}

export const defaultLogger = new Logger(DEBUG);
