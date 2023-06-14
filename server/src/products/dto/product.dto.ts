import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class ProductAttribute {
  @ApiProperty({ example: 'size', description: 'product attribute' })
  @IsString({ message: 'attribute must be a string' })
  attribute: string

  @ApiProperty({ example: 'large', description: 'value attribute' })
  @IsString({ message: 'value must be a string' })
  value: string
}

export default class ProductDto {
  @ApiProperty({ example: 'Window 123', description: 'product title' })
  @IsString({ message: 'title must be a string' })
  title: string

  @ApiProperty({
    example: 'big window and beautiful',
    description: 'product description',
  })
  @IsString({ message: 'description must be a string' })
  description: string

  @ApiProperty({ example: 3500, description: 'product price' })
  @IsNumber({}, { message: 'price must be a int' })
  price: number

  @ApiProperty({ example: 3, description: 'product count' })
  @IsNumber({}, { message: 'count must be a int' })
  count: number

  @ApiProperty({ example: 3, description: 'category id' })
  @IsNumber({}, { message: 'categoryId must be a int' })
  categoryId: number

  @ApiProperty({
    example: ['ewffwfrf.jpg', 'fergegerg.jpg'],
    description: 'array of image path',
  })
  @IsArray()
  images: Array<string>

  @ApiProperty({
    example: {
      attribute: 'Длина',
      value: '120 см',
    },
    description: 'product attribute-value',
  })
  // @IsArray({ context: ProductAttribute })
  attributes: Array<ProductAttribute>
}
