import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import AuthResponse from './auth.response'
import { AuthService } from './auth.service'
import AuthDto from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registration(
    @Body() dto: AuthDto,
    @Res() response: Response,
  ): Promise<Response<AuthResponse>> {
    const userData = await this.authService.registration(dto)
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000 * 100000,
      httpOnly: true,
    })
    return response.json(userData)
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: AuthDto,
    @Res() response: Response,
  ): Promise<Response<AuthResponse>> {
    const userData = await this.authService.login(dto)
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000 * 100000,
      httpOnly: true,
    })
    return response.json(userData)
  }

  @ApiOperation({ summary: 'refresh' })
  @ApiResponse({ status: 200, type: AuthResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<AuthResponse>> {
    const refreshToken: string = request.cookies.refreshToken
    const userData = await this.authService.refresh(refreshToken)
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000 * 100000,
      httpOnly: true,
    })
    return response.json(userData)
  }
}
