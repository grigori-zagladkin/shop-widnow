import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export default class ProductsResponse implements Product {
  @ApiProperty({ example: 1, description: 'product id' })
  id: number;

  @ApiProperty({ example: 'window-123', description: 'product slug' })
  slug: string;

  @ApiProperty({ example: 'Window 123', description: 'product title' })
  title: string;

  @ApiProperty({
    example: 'big window and beautiful',
    description: 'product description',
  })
  description: string;

  @ApiProperty({ example: 3500, description: 'product price' })
  price: number;

  @ApiProperty({ example: 3, description: 'product count' })
  count: number;

  @ApiProperty({
    example: ['ewffwfrf.jpg', 'fergegerg.jpg'],
    description: 'array of image path',
  })
  images: string[];

  @ApiProperty({ example: 1, description: 'category id' })
  categoryId: number;

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'created time',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Dec 17 1996 03:24:00 GMT...',
    description: 'created time',
  })
  updatedAt: Date;
}
