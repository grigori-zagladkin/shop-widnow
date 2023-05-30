import { ApiProperty } from '@nestjs/swagger'

export default class FileResponse {
  @ApiProperty({ example: 'efrwferfrgfwr.jpg', description: 'file name' })
  name: string

  @ApiProperty({
    example: 'erwgrege/ergregregg/efrwferfrgfwr.jpg',
    description: 'file name',
  })
  url: string
}
