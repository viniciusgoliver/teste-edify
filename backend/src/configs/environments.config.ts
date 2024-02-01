export const environments = (): Record<string, unknown> => ({
  NODE_ENV: process.env.NODE_ENV,
  app: {
    name: process.env.APP_NAME,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    port: parseInt(process.env.PORT ?? '3000', 10),
    url: process.env.APP_URL
  },
  logger: {
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE_NAME
  },
  db: {
    databaseUrl: process.env.DATABASE_URL
  },
  external: {
    apiLivros: process.env.API_LIVROS
  }
})
