import { ApiProperty } from '@nestjs/swagger'

export class UserAuthResponse {
  @ApiProperty({ example: 1, description: 'user id' })
  id: number

  @ApiProperty({ example: 'test@test.ru', description: 'email' })
  email: string

  @ApiProperty({ example: 'USER', description: 'user role' })
  role: string
}

export default class AuthResponse {
  @ApiProperty({
    example: {
      id: 1,
      email: 'wefrweffgwer@test.ru',
      role: 'ADMIN',
    },
    description: 'user info',
  })
  user: UserAuthResponse

  @ApiProperty({
    example: 'ewfwf.wefweffe.wefewf',
    description: 'access token',
  })
  accessToken: string

  @ApiProperty({
    example: 'ewfwf.wefweffe.wefewf',
    description: 'refresh token',
  })
  refreshToken: string
}
