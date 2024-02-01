import { type TypeOrmModuleOptions } from '@nestjs/typeorm'
import { environments } from '../configs/environments.config'

export const typeOrmConfig = async (): Promise<TypeOrmModuleOptions> => {
  const environment = JSON.parse(JSON.stringify(environments()))
  return {
    type: environment.db.type,
    host: environment.db.host,
    port: environment.db.port,
    username: environment.db.username,
    password: environment.db.password,
    database: environment.db.database,
    entities: environment.db.entities,
    synchronize: environment.db.synchronize
  }
}
