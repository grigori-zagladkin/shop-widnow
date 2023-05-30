import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsString, Length } from 'class-validator'

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export default class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.ru', description: 'E-mail' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Невалидный e-mail' })
  email: string

  @ApiProperty({ example: 'wefwfwfwf2e32r2fewffew', description: 'Password' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 20, { message: 'пароль от 4 до 20 символов' })
  password: string

  @ApiProperty({
    example: UserRole.ADMIN,
    description: 'Является ли юзер админом',
  })
  @IsEnum(UserRole, { message: 'Должно быть user || admin' })
  role: UserRole
}
