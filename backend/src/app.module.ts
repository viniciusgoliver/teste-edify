import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { loggerConfig } from './configs/logger.config'
import { AppService } from './app.service'
import { environments } from './configs/environments.config'
import { validationSchema } from './configs/validation/validation'
import { WinstonModule } from 'nest-winston'
import { PrismaModule } from './utils/prisma/prisma.module'
import { LivroModule } from './modules/livro/livro.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      envFilePath: '.env',
      expandVariables: false,
      isGlobal: true,
      load: [environments],
      validationSchema,
      cache: false
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: loggerConfig
    }),
    LivroModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
