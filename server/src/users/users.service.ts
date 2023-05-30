import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import CreateUserDto from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const { email } = dto
    const candidate = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    })
    if (candidate) {
      throw new HttpException(
        'Юзер с таким e-mail уже существует',
        HttpStatus.FORBIDDEN,
      )
    } else {
      const newUser = await this.prismaService.user.create({
        data: {
          ...dto,
          password: await hash(dto.password),
          role: dto.role,
        },
      })
      return newUser
    }
  }

  async getUserById(id: number) {
    return await this.prismaService.user.findUniqueOrThrow({ where: { id } })
  }

  async getAllUsers() {
    return await this.prismaService.user.findMany()
  }

  async updateUser(id: number, dto: CreateUserDto) {
    const user = await this.getUserById(id)
    if (user) {
      return await this.prismaService.user.update({
        where: { id },
        data: {
          email: dto.email,
          password: await hash(dto.password),
          role: dto.role,
        },
      })
    }
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id)
    if (user) {
      return await this.prismaService.user.delete({
        where: { id },
      })
    }
  }
}
