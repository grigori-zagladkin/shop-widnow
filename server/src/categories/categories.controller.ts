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
import CategoryResponse from './categories.response'
import { CategoriesService } from './categories.service'
import CategoryDto from './dto/category.dto'

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'get all categories' })
  @ApiResponse({ status: 200, type: [CategoryResponse] })
  @HttpCode(200)
  @Get()
  async getAllCategories(@Query('searchTerm') searchTerm?: string) {
    return await this.categoriesService.getAllCategories(searchTerm)
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'create category' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HttpCode(200)
  @Post()
  async createCategory() {
    return await this.categoriesService.createCategory()
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'get category by id' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HttpCode(200)
  @Get('/:id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoriesService.getCategoryById(+id)
  }

  @ApiOperation({ summary: 'get category by slug' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HttpCode(200)
  @Get('by-slug/:slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return await this.categoriesService.getCategoryBySlug(slug)
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'update category' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateCategory(@Body() dto: CategoryDto, @Param('id') id: string) {
    return await this.categoriesService.updateCategory(+id, dto)
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'delete category' })
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HttpCode(200)
  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(+id)
  }
}
