import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { BannerDto } from './banner.dto'

@Injectable()
export class BannerService {
  constructor(private readonly prismaService: PrismaService) {}

  async createBanner() {
    return await this.prismaService.banner
      .create({
        data: {
          title: '',
          description: '',
          image: '',
          order: 0,
        },
      })
      .then((data) => data.id)
  }

  async getAllBanners() {
    return await this.prismaService.banner.findMany({})
  }

  async getBannerById(id: number) {
    return await this.prismaService.banner.findUnique({
      where: {
        id,
      },
    })
  }

  async updateBanner(id: number, dto: BannerDto) {
    return await this.prismaService.banner.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })
  }

  async deleteBanner(id: number) {
    return await this.prismaService.banner.delete({
      where: {
        id,
      },
    })
  }
}
