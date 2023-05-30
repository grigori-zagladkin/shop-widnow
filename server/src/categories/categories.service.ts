import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { FilesService } from 'src/files/files.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import CategoryDto from './dto/category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}

  async createCategory() {
    return await this.prismaService.category
      .create({
        data: {
          title: '',
          description: '',
          image: '',
          slug: '',
        },
      })
      .then((data) => data.id)
  }

  async getAllCategories(searchTerm?: string) {
    const categoryWhereInput: Prisma.CategoryWhereInput = searchTerm
      ? {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }
      : {}
    return await this.prismaService.category.findMany({
      where: categoryWhereInput,
    })
  }

  async getCategoryById(id: number) {
    return await this.prismaService.category.findUniqueOrThrow({
      where: { id },
    })
  }

  getCategoryBySlug = async (slug: string) =>
    await this.prismaService.category.findFirst({ where: { slug } })

  async updateCategory(id: number, dto: CategoryDto) {
    await this.getCategoryById(id)
    return await this.prismaService.category.update({
      where: { id },
      data: { ...dto, slug: generateSlug(dto.title) },
    })
  }

  async deleteCategory(id: number) {
    const category = await this.getCategoryById(id)
    const arr = category.image.split('/')
    await this.fileService.deleteFile(arr[arr.length - 1], arr[arr.length - 2])
    await this.prismaService.attributeOnCategories.deleteMany({
      where: { categoryId: id },
    })
    return await this.prismaService.category.delete({ where: { id } })
  }
}
