import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export default class CategoryDto {
  @IsString({ message: 'categories should be a string' })
  @ApiProperty({ example: 'windows', description: 'title category' })
  title: string

  @IsString({ message: 'description should be a string' })
  @ApiProperty({
    example: 'big window with low price',
    description: 'description category',
  })
  description: string

  @IsString({ message: 'image path should be a string' })
  @ApiProperty({ example: 'wergegegergege.jpg', description: 'image path' })
  image: string
}
