import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export default class CategoryResponse implements Category {
  @ApiProperty({ example: 1, description: 'category id' })
  id: number;

  @ApiProperty({ example: 'new-window', description: 'category slug' })
  slug: string;

  @ApiProperty({ example: 'window', description: 'title category' })
  title: string;

  @ApiProperty({
    example: 'this category have ...',
    description: 'category description',
  })
  description: string;

  @ApiProperty({ example: 'wefewfwfwf.jpg', description: 'file name' })
  image: string;

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'created time',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'updated time',
  })
  updatedAt: Date;
}
