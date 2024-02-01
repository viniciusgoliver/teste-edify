import { Controller, Post, Get, Patch, Body, Param, Delete } from '@nestjs/common'
import { LivroService } from './livro.service'
import { CreateLivroDto } from './dto/create-livro.dto'
import { type Livro } from '@prisma/client'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateLivroDto } from './dto/update-livro.dto'
import { SearchLivroDto } from './dto/search-livro.dto'
import { type ReturnLivroDto } from './dto/return-livro.dto'

@ApiTags('API de Livro')
@Controller({ path: 'livro', version: '1' })
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  @ApiBody({ type: CreateLivroDto })
  @ApiResponse({ status: 200, description: 'Cadastro de Livro' })
  async create(@Body() createDto: CreateLivroDto): Promise<Livro> {
    return this.livroService.create(createDto)
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Listagem de Livros' })
  async findAll(): Promise<Livro[]> {
    return this.livroService.findAll()
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Busca de Livro' })
  async findById(@Param('id') id: string): Promise<Livro> {
    return this.livroService.findById(id)
  }

  @Post('search')
  @ApiResponse({ status: 200, description: 'Busca de Livro por Título ou Autor ou Descrição' })
  async find(@Body() data: SearchLivroDto): Promise<ReturnLivroDto> {
    const { search } = data
    return this.livroService.find(search)
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Atualização de Livro' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateLivroDto): Promise<Livro> {
    return this.livroService.update(id, updateDto)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Exclusão de Livro' })
  async remove(@Param('id') id: string): Promise<Livro> {
    return this.livroService.remove(id)
  }
}
