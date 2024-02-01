import * as Joi from 'joi'

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
  APP_NAME: Joi.string().default('NestApplication'),
  APP_DESCRIPTION: Joi.string().default('NestApplication'),
  APP_VERSION: Joi.string().required(),
  APP_URL: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string(),
  LOG_LEVEL: Joi.string(),
  LOG_FILE_NAME: Joi.string(),
  API_LIVROS: Joi.string()
})
