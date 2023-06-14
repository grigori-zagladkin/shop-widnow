import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export default class AttributeDto {
  @IsString({ message: 'title should be a string' })
  @ApiProperty({ example: 'value', description: 'attribute value' })
  title: string

  @IsArray({ message: 'category ids should be an array of int' })
  @ApiProperty({ example: [1, 2, 3], description: 'category ids' })
  categories: number[]
}
