/**
 * Environment-based logging service
 *
 * Provides structured logging with different levels (debug, info, warn, error)
 * that only outputs in development mode or when explicitly enabled.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Debug logs - only in development
   * Use for detailed implementation information
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, context ? context : '');
    }
  }

  /**
   * Info logs - general informational messages
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context ? context : '');
    }
  }

  /**
   * Warning logs - something unexpected but handled
   */
  warn(message: string, context?: LogContext): void {
    console.warn(`[WARN] ${message}`, context ? context : '');
  }

  /**
   * Error logs - always logged, should be tracked in production
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    console.error(`[ERROR] ${message}`, {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : error,
      context,
    });

    // TODO: In production, send to error tracking service (e.g., Sentry)
    // if (!this.isDevelopment && typeof window !== 'undefined') {
    //   // Send to error tracking
    // }
  }

  /**
   * Creates a scoped logger with a prefix
   */
  scope(prefix: string) {
    return {
      debug: (message: string, context?: LogContext) =>
        this.debug(`[${prefix}] ${message}`, context),
      info: (message: string, context?: LogContext) =>
        this.info(`[${prefix}] ${message}`, context),
      warn: (message: string, context?: LogContext) =>
        this.warn(`[${prefix}] ${message}`, context),
      error: (message: string, error?: Error | unknown, context?: LogContext) =>
        this.error(`[${prefix}] ${message}`, error, context),
    };
  }
}

// Export singleton instance
export const logger = new Logger();

// Convenience factory for scoped loggers
export function createLogger(moduleName: string) {
  return logger.scope(moduleName);
}

// Export scoped loggers for common areas
export const rankingLogger = logger.scope('Ranking');
export const authLogger = logger.scope('Auth');
export const stadiumLogger = logger.scope('Stadium');
export const dbLogger = logger.scope('Database');
