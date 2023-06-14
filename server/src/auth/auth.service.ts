import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserRole } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import AuthResponse, { UserAuthResponse } from './auth.response'
import AuthDto from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(dto: AuthDto): Promise<AuthResponse> {
    const candidate = await this.prismaService.user.findFirst({
      where: { email: dto.email },
    })
    if (candidate) {
      throw new BadRequestException('user has already exist')
    }
    const user = await this.userService.createUser({
      email: dto.email,
      password: dto.password,
      role: UserRole.ADMIN,
    })
    const tokens = await this.getNewPairTokens(user)
    return {
      user: this.getUsersFields(user),
      ...tokens,
    }
  }
  async login(dto: AuthDto): Promise<AuthResponse> {
    const user = await this.validateUser(dto)
    const tokens = await this.getNewPairTokens(user)
    return {
      user: this.getUsersFields(user),
      ...tokens,
    }
  }
  async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new UnauthorizedException('Please sign in')
    }
    const result = await this.jwtService.verifyAsync(refreshToken)
    if (!result) {
      throw new UnauthorizedException('Invalid token or expired')
    } else {
      const user = await this.userService.getUserById(result.id)
      const tokens = await this.getNewPairTokens(user)
      return {
        user: this.getUsersFields(user),
        ...tokens,
      }
    }
  }
  private async validateUser(dto: AuthDto): Promise<User | null> {
    const candidate = await this.prismaService.user.findUniqueOrThrow({
      where: { email: dto.email },
    })
    const isValidPassword = await verify(candidate.password, dto.password)
    if (candidate && isValidPassword) {
      return candidate
    }
    throw new UnauthorizedException('User or password is not valid')
  }
  private async getNewPairTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = this.getUsersFields(user)
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '300000d',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3000000000d',
      }),
    }
  }
  private getUsersFields(user: User): UserAuthResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  }
}
