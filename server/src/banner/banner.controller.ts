import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { BannerService } from './banner.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { BannerDto } from './banner.dto'

@ApiTags('banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @Auth('ADMIN')
  @Post()
  async createBanner(): Promise<number> {
    return await this.bannerService.createBanner()
  }

  @HttpCode(200)
  @Get()
  async getAllBanners() {
    return await this.bannerService.getAllBanners()
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Auth('ADMIN')
  @Get(':id')
  async getBannerById(@Param('id') id: string) {
    return await this.bannerService.getBannerById(+id)
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Auth('ADMIN')
  @Patch(':id')
  async updateBanner(@Param('id') id: string, @Body() dto: BannerDto) {
    return await this.bannerService.updateBanner(+id, dto)
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Auth('ADMIN')
  @Delete(':id')
  async deleteBanner(@Param('id') id: string) {
    return await this.bannerService.deleteBanner(+id)
  }
}
