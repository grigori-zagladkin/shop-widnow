import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export default class UsersResponse {
  @ApiProperty({ example: 1, description: 'user id' })
  id: number

  @ApiProperty({ example: 'test@test.ru', description: 'email' })
  email: string

  @ApiProperty({
    example: 'fewgreger24r335y8y4yetg',
    description: 'user password',
  })
  password: string

  @ApiProperty({ example: 'ADMIN', description: 'user role' })
  role: Role

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'updated time',
  })
  createdAt: Date

  @ApiProperty({
    example: 'Sun Dec 17 1995 03:24:00 GMT...',
    description: 'updated time',
  })
  updatedAt: Date
}
