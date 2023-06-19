import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
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
import ProductDto from './dto/product.dto'
import SearchProductDto from './dto/search-product.dto'
import ProductsResponse from './products.response'
import { ProductsService } from './products.service'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'get product by slug' })
  @ApiResponse({ status: 200, type: ProductsResponse })
  @HttpCode(200)
  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return await this.productsService.getBySlug(slug)
  }

  @ApiOperation({ summary: 'get similar products' })
  @ApiResponse({ status: 200, type: [ProductsResponse] })
  @HttpCode(200)
  @Get('similar/:slug')
  async getSimilarProducts(@Param('slug') slug: string) {
    return await this.productsService.getSimilarProducts(slug)
  }

  @ApiOperation({ summary: 'get last products' })
  @ApiResponse({ status: 200, type: [ProductsResponse] })
  @HttpCode(200)
  @Get('last')
  async getLastProducts() {
    return await this.productsService.getLastProducts()
  }

  @ApiOperation({ summary: 'get all products' })
  @ApiResponse({ status: 200, type: [ProductsResponse] })
  @HttpCode(200)
  @Get()
  async getAllProducts(@Query() dto: SearchProductDto) {
    return await this.productsService.index(dto)
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get product by id' })
  @ApiResponse({ status: 200, type: ProductsService })
  @HttpCode(200)
  @Auth('ADMIN')
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(+id)
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'create product' })
  @ApiResponse({ status: 200, type: ProductsService })
  @HttpCode(200)
  @Post()
  async createProduct() {
    return await this.productsService.createProduct()
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'get product by id' })
  @ApiResponse({ status: 200, type: ProductsService })
  @HttpCode(200)
  // @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    console.log(dto)
    return await this.productsService.updateProduct(+id, dto)
  }

  @ApiBearerAuth()
  @Auth('ADMIN')
  @ApiOperation({ summary: 'get product by id' })
  @ApiResponse({ status: 200, type: ProductsService })
  @HttpCode(200)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(+id)
  }
}
