import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export default class AuthDto {
  @ApiProperty({ example: 'test@test.ru', description: 'email' })
  @IsEmail({}, { message: 'email should ne a correct' })
  @IsString()
  email: string

  @ApiProperty({ example: 'qwewffewfewfw', description: 'password' })
  @IsString({ message: 'password should be a string' })
  @Length(6, 20)
  password: string
}
