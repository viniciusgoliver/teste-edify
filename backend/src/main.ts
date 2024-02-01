import { ClassSerializerInterceptor, ValidationPipe, HttpStatus, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, type SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
  })
  app.useGlobalPipes(new ValidationPipe())
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      validationError: { target: true, value: true },
      whitelist: true
    })
  )
  app.enableVersioning({
    type: VersioningType.URI
  })
  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('app.name') ?? 'Edify Tech Application')
    .setDescription(configService.get<string>('app.description') ?? 'Edify Tech Application')
    .setVersion(configService.get<string>('app.version') ?? '1.0')
    .addServer(configService.get<string>('app.url') ?? 'http://localhost:3001')
    .build()

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => `${controllerKey}:${methodKey}`
  }

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get<number>('app.port') ?? 3001, () => {
    console.log(`Server is running on: ${configService.get<string>('app.port') ?? 3001}`)
  })
}
bootstrap()
  .then(() => true)
  .catch((err) => {
    console.error(err)
  })
