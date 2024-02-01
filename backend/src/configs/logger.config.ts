import { type ConfigService } from '@nestjs/config'
import { type WinstonModuleOptions } from 'nest-winston'
import * as winston from 'winston'
import type Transport from 'winston-transport'

const fileTransport = (configService: ConfigService): Transport => {
  const logFilename = configService.get<string>('logger.filename') ?? 'app.log'
  return new winston.transports.File({
    filename: `log/${logFilename}`,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json())
  })
}

const consoleTransport = (): Transport => {
  return new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(), winston.format.json())
  })
}

export const loggerConfig = async (configService: ConfigService): Promise<WinstonModuleOptions> => {
  const level = configService.get<any>('logger.level')
  const transports = [consoleTransport()]
  const appEnv = configService.get<string>('NODE_ENV')
  if (appEnv === 'development') {
    transports.push(fileTransport(configService))
  }
  if (appEnv === 'prod') {
    transports.push(fileTransport(configService))
  }
  return { level, transports }
}
