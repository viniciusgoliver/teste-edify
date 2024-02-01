import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { type Livro } from '@prisma/client'
import { PrismaService } from '../../utils/prisma/prisma.service'
import { type CreateLivroDto } from './dto/create-livro.dto'
import { type UpdateLivroDto } from './dto/update-livro.dto'

@Injectable()
export class LivroRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: CreateLivroDto): Promise<Livro> {
    if (createDto.setInicioLeitura) {
      createDto.dataInicioLeitura = new Date()
    }

    if (createDto.setFimLeitura) {
      createDto.dataFimLeitura = new Date()
    }

    delete createDto.setInicioLeitura
    delete createDto.setFimLeitura

    return await this.prismaService.livro.create({ data: createDto })
  }

  async findAll(): Promise<any[]> {
    const found = await this.prismaService.livro.findMany({
      orderBy: [{ createdAt: 'asc' }],
      select: {
        id: true,
        idExterno: true,
        titulo: true,
        descricao: true,
        autor: true,
        qtdPaginas: true,
        miniatura: true,
        avaliacao: true,
        opiniao: true,
        dataInicioLeitura: true,
        dataFimLeitura: true
      }
    })

    if (found.length === 0) {
      throw new HttpException('Nenhum livro encontrado', HttpStatus.NOT_FOUND)
    }

    return found
  }

  async findById(id: string): Promise<any> {
    const found = await this.prismaService.livro.findUnique({
      where: { id },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        autor: true,
        qtdPaginas: true,
        miniatura: true,
        avaliacao: true,
        opiniao: true,
        dataInicioLeitura: true,
        dataFimLeitura: true
      }
    })

    if (!found) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND)
    }

    return found
  }

  async find(search: string): Promise<any> {
    const termoTextual = search.trim()
    const found = await this.prismaService.$queryRaw`
      SELECT 
        id, 
        titulo, 
        descricao, 
        autor, 
        "qtdPaginas", 
        miniatura, 
        avaliacao, 
        opiniao,
        "dataInicioLeitura",
        "dataFimLeitura"
      FROM Livro 
      WHERE 
        similarity(titulo, ${termoTextual}) > 0.1        
      ORDER BY 
        similarity(titulo, ${termoTextual}) DESC;
    `

    if (!found) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND)
    }

    return found
  }

  async update(id: string, updateDto: UpdateLivroDto): Promise<Livro> {
    await this.findById(id)
    return await this.prismaService.livro.update({ where: { id }, data: updateDto })
  }

  async remove(id: string): Promise<Livro> {
    await this.findById(id)
    return await this.prismaService.livro.delete({ where: { id } })
  }
}
