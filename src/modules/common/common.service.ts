import { ROOT } from '~/constants';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

enum LogType {
  ERROR = 'error',
  WARNING = 'warning',
}

@Injectable()
export class CommonService {
  private BASE_LOG_PATH = path.join(ROOT, 'logs');

  constructor() {
    fs.mkdirSync(path.join(this.BASE_LOG_PATH), { recursive: true });
  }

  private writeLog(
    data: string,
    type: LogType = LogType.ERROR,
    includeTimestamp?: boolean,
  ) {
    return fs.writeFileSync(
      path.join(this.BASE_LOG_PATH, `${type}.log`),
      `${includeTimestamp ? new Date().toLocaleString() : ''}${data}\n`,
      { flag: 'a' },
    );
  }
  /**
   * Write an record into file called error.log which are placed in BASE_LOG_PATH folder
   *
   * @param  {} data - record data (required)
   * @param { boolean } includeTimestamp - use this parameter if you want to include timestamp in record (not required)
   */
  public writeErrorLog(data, includeTimestamp?: boolean) {
    this.writeLog(data, LogType.ERROR, includeTimestamp);
  }

  /**
   * Write an record into file called warning.log which are placed in BASE_LOG_PATH folder
   *
   * @param  {} data - record data (required)
   * @param { boolean } includeTimestamp - use this parameter if you want to include timestamp in record (not required)
   */
  public writeWarningLog(data, includeTimestamp?: boolean) {
    this.writeLog(data, LogType.WARNING, includeTimestamp);
  }
}
