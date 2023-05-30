import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumberString, IsOptional } from 'class-validator'

export default class PaginationDto {
  @ApiPropertyOptional({ example: '1', description: 'current page' })
  @IsOptional()
  @IsNumberString({}, { message: 'page should be a number' })
  page?: string

  @ApiPropertyOptional({ example: '30', description: 'product per page' })
  @IsOptional()
  @IsNumberString({}, { message: 'perpage should be a number' })
  perPage?: string
}
