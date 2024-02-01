import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator'

export class CreateLivroDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  idExterno: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  titulo: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  descricao?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  autor?: string

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  qtdPaginas?: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  miniatura?: string

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  avaliacao?: number

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  opiniao?: string

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  dataInicioLeitura?: Date

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  dataFimLeitura?: Date

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  setInicioLeitura?: boolean

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  setFimLeitura?: boolean
}
