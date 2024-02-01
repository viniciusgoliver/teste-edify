import { HttpException, Injectable, Logger } from '@nestjs/common'
import { type CreateLivroDto } from './dto/create-livro.dto'
import { type Livro } from '@prisma/client'
import { LivroRepository } from './livro.repository'
import { type UpdateLivroDto } from './dto/update-livro.dto'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { environments } from '../../configs/environments.config'
import { type ReturnLivroDto } from './dto/return-livro.dto'

@Injectable()
export class LivroService {
  private readonly logger = new Logger(LivroService.name)
  private readonly environment = JSON.parse(JSON.stringify(environments()))
  constructor(private readonly livroRepository: LivroRepository, private readonly http: HttpService) {}

  async create(createDto: CreateLivroDto): Promise<Livro> {
    return await this.livroRepository.create(createDto)
  }

  async findAll(): Promise<Livro[]> {
    return await this.livroRepository.findAll()
  }

  async findById(id: string): Promise<Livro> {
    return await this.livroRepository.findById(id)
  }

  async find(search: string): Promise<ReturnLivroDto> {
    const busca = search.trim().replace(/ /g, '+')
    const { data } = await firstValueFrom(this.http.get(`${this.environment.apiLivros}?q=${busca}`)).catch((err) => {
      this.logger.error(err.response)
      throw new HttpException(err.response.data.error, err.response.status)
    })

    return data.items.map((item) => {
      return {
        idExterno: item.id,
        titulo: item.volumeInfo.title,
        descricao: item.volumeInfo.description,
        autor: item.volumeInfo.authors,
        qtdPaginas: item.volumeInfo.pageCount,
        miniatura: item.volumeInfo.imageLinks?.thumbnail
      }
    })
  }

  async update(id: string, updateDto: UpdateLivroDto): Promise<Livro> {
    return await this.livroRepository.update(id, updateDto)
  }

  async remove(id: string): Promise<Livro> {
    return await this.livroRepository.remove(id)
  }
}
