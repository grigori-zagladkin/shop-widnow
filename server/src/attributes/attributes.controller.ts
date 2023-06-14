import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
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
import AttributeResponse from './attribute.response'
import { AttributesService } from './attributes.service'
import AttributeDto from './dto/attribute.dto'

@ApiBearerAuth()
@ApiTags('attributes')
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @ApiOperation({ summary: 'create attribute' })
  @ApiResponse({ status: 200, type: AttributeResponse })
  @HttpCode(200)
  @Auth('ADMIN')
  @UsePipes(new ValidationPipe())
  @Post()
  async createAttribute() {
    return await this.attributesService.createAttribute()
  }

  @ApiOperation({ summary: 'get attribute by category' })
  @ApiResponse({ status: 200, type: [AttributeResponse] })
  @HttpCode(200)
  @Auth('ADMIN')
  @Get('category/:categoryId')
  async getAttributesByCategory(@Param('categoryId') categoryId: string) {
    return await this.attributesService.getAttributesByCategory(+categoryId)
  }

  @ApiOperation({ summary: 'get all attribute' })
  @ApiResponse({ status: 200, type: [AttributeResponse] })
  @HttpCode(200)
  @Auth('ADMIN')
  @Get()
  async getAllAttributes(@Query('searchTerm') searchTerm?: string) {
    return await this.attributesService.getAllAttributes(searchTerm)
  }

  @ApiOperation({ summary: 'get attribute by id' })
  @ApiResponse({ status: 200, type: AttributeResponse })
  @HttpCode(200)
  @Auth('ADMIN')
  @Get('/:id')
  async getAttributeById(@Param('id') id: string) {
    return await this.attributesService.getAttributeById(+id)
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'update attribute' })
  @ApiResponse({ status: 200, type: AttributeResponse })
  @HttpCode(200)
  @Auth('ADMIN')
  @Put('/:id')
  async updateAttribute(@Param('id') id: string, @Body() dto: AttributeDto) {
    return await this.attributesService.updateAttribute(+id, dto)
  }

  @ApiOperation({ summary: 'delete attribute' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Auth('ADMIN')
  @Delete('/:id')
  async deleteAttribute(@Param('id') id: string) {
    return await this.attributesService.deleteAttribute(+id)
  }
}
