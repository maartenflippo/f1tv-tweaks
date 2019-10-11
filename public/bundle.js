(function () {
    'use strict';

    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
        LogLevel[LogLevel["WARN"] = 1] = "WARN";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    })(LogLevel || (LogLevel = {}));
    var Logger = /** @class */ (function () {
        function Logger(logLevel, prefix) {
            if (prefix === void 0) { prefix = "F1TV Tweaks"; }
            this.logLevel = logLevel;
            this.prefix = prefix;
        }
        Logger.prototype.error = function (message) {
            this.log(LogLevel.ERROR, message);
        };
        Logger.prototype.warn = function (message) {
            this.log(LogLevel.WARN, message);
        };
        Logger.prototype.info = function (message) {
            this.log(LogLevel.INFO, message);
        };
        Logger.prototype.debug = function (message) {
            this.log(LogLevel.DEBUG, message);
        };
        Logger.prototype.log = function (logLevel, message) {
            if (logLevel <= this.logLevel) {
                console.log("[" + this.prefix + "] " + message);
            }
        };
        return Logger;
    }());

    var logger = new Logger(LogLevel.DEBUG);
    logger.info("Starting...");

}());
