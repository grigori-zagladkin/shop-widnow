import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import PaginationDto from 'src/pagination/dto/pagination.dto'

export enum EnumSortProduct {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export default class SearchProductDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'high-price', description: 'sort type' })
  @IsOptional()
  @IsEnum(EnumSortProduct)
  sort?: EnumSortProduct

  @ApiPropertyOptional({
    example: 'new window 1200*900',
    description: 'search string',
  })
  @IsOptional()
  @IsString()
  searchTerm?: string

  @ApiPropertyOptional({ example: 1, description: 'category id' })
  @IsOptional()
  @IsNumber()
  categoryId?: number

  @ApiPropertyOptional({ example: 100, description: 'min price' })
  @IsOptional()
  @IsNumber()
  minPrice?: number

  @ApiPropertyOptional({ example: 1000, description: 'max price' })
  @IsOptional()
  @IsNumber()
  maxPrice?: number
}
