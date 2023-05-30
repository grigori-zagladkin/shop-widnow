import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import CreateUserDto from './dto/create-user.dto'
import UsersResponse from './users.response'
import { UsersService } from './users.service'

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth('ADMIN')
  @ApiOperation({ summary: 'user create' })
  @ApiResponse({ status: 200, type: UsersResponse })
  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto)
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [UsersResponse] })
  @Get()
  @Auth('ADMIN')
  @HttpCode(200)
  async getAllUsers() {
    return await this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'get user by id' })
  @ApiResponse({ status: 200, type: UsersResponse })
  @Get('/:id')
  @Auth('ADMIN')
  @HttpCode(200)
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(+id)
  }

  @ApiOperation({ summary: 'update user' })
  @ApiResponse({ status: 200, type: UsersResponse })
  @Put('/:id')
  @Auth('ADMIN')
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return await this.usersService.updateUser(+id, dto)
  }

  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({ status: 200 })
  @Delete('/:id')
  @Auth('ADMIN')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(+id)
  }
}
