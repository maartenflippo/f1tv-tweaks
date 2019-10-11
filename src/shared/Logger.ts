export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
}

export class Logger {
    constructor(private logLevel: LogLevel, private prefix = "F1TV Tweaks") {}

    error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    private log(logLevel: LogLevel, message: string) {
        if (logLevel <= this.logLevel) {
            console.log(`[${this.prefix}] ${message}`);
        }
    }
}

export const defaultLogger = new Logger(LogLevel.INFO);
