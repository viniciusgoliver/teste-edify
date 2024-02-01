import { Test, type TestingModule } from '@nestjs/testing'
import { LivroRepository } from './livro.repository'
import { LivroService } from './livro.service'
import { type CreateLivroDto } from './dto/create-livro.dto'

const mockLivroRepository: any = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
})

describe('LivroService', () => {
  let livroRepository
  let service

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivroService,
        {
          provide: LivroRepository,
          useFactory: mockLivroRepository
        }
      ]
    }).compile()

    livroRepository = module.get<LivroRepository>(LivroRepository)
    service = module.get<LivroService>(LivroService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(livroRepository).toBeDefined()
  })

  describe('createLivro', () => {
    let mockCreateLivroDto: CreateLivroDto

    beforeEach(() => {
      mockCreateLivroDto = {
        idExterno: '123',
        titulo: 'Livro de Teste',
        descricao: 'Descrição de Teste',
        autor: 'Autor de Teste',
        qtdPaginas: 150,
        miniatura: 'miniatura.jpg',
        avaliacao: 8,
        opiniao: 'Opinião de Teste'
      }
    })

    it('should create a new Livro', async () => {
      livroRepository.create.mockResolvedValue('someLivro')

      expect(livroRepository.create).not.toHaveBeenCalled()
      const result = await service.create(mockCreateLivroDto)
      expect(livroRepository.create).toHaveBeenCalledWith(mockCreateLivroDto)
      expect(result).toEqual('someLivro')
    })
  })

  describe('findAll', () => {
    it('should get all Livros', async () => {
      livroRepository.findAll.mockResolvedValue('someLivros')

      expect(livroRepository.findAll).not.toHaveBeenCalled()
      const result = await service.findAll()
      expect(livroRepository.findAll).toHaveBeenCalled()
      expect(result).toEqual('someLivros')
    })
  })

  describe('findById', () => {
    it('should retrieve a Livro with an ID', async () => {
      livroRepository.findById.mockResolvedValue('someLivro')

      const result = await service.findById(1)
      expect(result).toEqual('someLivro')
    })
  })

  describe('find', () => {
    it('should retrieve a Livro with a search', async () => {
      livroRepository.find.mockResolvedValue('someLivro')

      const result = await service.find('search')
      expect(result).toEqual('someLivro')
    })
  })

  describe('update', () => {
    it('should return affected > 0 if Livro was updated', async () => {
      livroRepository.update.mockResolvedValue({ affected: 1 })

      const result = await service.update(1, { description: 'new description' })
      expect(result).toEqual({ affected: 1 })
    })
  })

  describe('remove', () => {
    it('should return affected > 0 if Livro was deleted', async () => {
      livroRepository.delete.mockResolvedValue({ affected: 1 })

      const result = await service.remove(1)
      expect(result).toEqual({ affected: 1 })
    })
  })
})
