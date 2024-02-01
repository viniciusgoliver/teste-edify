import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { LivroService } from './livro.service'
import { LivroController } from './livro.controller'
import { LivroRepository } from './livro.repository'

@Module({
  imports: [HttpModule],
  controllers: [LivroController],
  providers: [LivroService, LivroRepository]
})
export class LivroModule {}
