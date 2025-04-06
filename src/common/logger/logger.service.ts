import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }

  warn(message: string) {
    console.warn(`[WARN] ${message}`);
  }

  error(message: string, trace?: string) {
    console.error(`[ERROR] ${message}`);
    if (trace) {
      console.error(`[TRACE] ${trace}`);
    }
  }

  debug(message: string) {
    console.debug(`[DEBUG] ${message}`);
  }
}
