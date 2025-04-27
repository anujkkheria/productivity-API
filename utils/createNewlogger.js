import { createLogger, transports } from 'winston'
import { format } from 'winston'
import path from 'path'
import fs from 'fs'

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
  },
}

const logsDir = path.join(process.cwd(), 'logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

const filename = path.join(logsDir, 'logs.log')

export const createNewLogger = createLogger({
  level: 'info',
  levels: config.levels,
  transports: [
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.timestamp(),
        format.printf(
          (info) => `${info.level} ${info.timestamp} ${info.message}`
        )
      ),
    }),
    new transports.File({
      level: 'error',
      filename,
      format: format.json(),
    }),
  ],
})
