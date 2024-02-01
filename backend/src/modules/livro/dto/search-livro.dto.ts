import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SearchLivroDto {
  @ApiProperty({ required: true })
  @IsString()
  search: string
}
