import { ApiProperty } from '@nestjs/swagger'

export default class AttributeResponse {
  @ApiProperty({ example: 'value', description: 'attribute value' })
  title: string

  @ApiProperty({ example: 1, description: 'category id' })
  categoryId: number

  @ApiProperty({ example: 1, description: 'attribute id' })
  id: number

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'created time',
  })
  createdAt: Date

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'updated time',
  })
  updatedAt: Date
}
