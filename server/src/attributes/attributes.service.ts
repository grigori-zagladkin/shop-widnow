import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CategoriesService } from 'src/categories/categories.service'
import { PrismaService } from 'src/prisma/prisma.service'
import AttributeDto from './dto/attribute.dto'

@Injectable()
export class AttributesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getAllAttributes(searchTerm?: string) {
    const prismaAttributeSearchFilter: Prisma.AttributeWhereInput = searchTerm
      ? {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }
      : {}
    return await this.prismaService.attribute
      .findMany({
        where: prismaAttributeSearchFilter,
        include: {
          categories: true,
        },
      })
      .then((data) =>
        data.map((item) => ({
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          categories: item.categories.map((c) => c.categoryId),
        })),
      )
  }

  async getAttributesByCategory(categoryId: number) {
    await this.categoriesService.getCategoryById(categoryId)
    return await this.prismaService.attribute
      .findMany({
        where: {
          categories: {
            some: {
              categoryId,
            },
          },
        },
        include: {
          categories: true,
        },
      })
      .then((data) =>
        data.map((item) => ({
          id: item.id,
          title: item.title,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          categories: item.categories.map((c) => c.categoryId),
        })),
      )
  }

  async createAttribute() {
    const attribute = await this.prismaService.attribute.create({
      data: {
        title: '',
      },
    })
    return attribute.id
  }

  async getAttributeById(id: number) {
    return await this.prismaService.attribute
      .findUniqueOrThrow({
        where: { id },
        include: {
          categories: true,
        },
      })
      .then((data) => ({
        title: data.title,
        id: data.id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        categories: data.categories.map((c) => c.categoryId),
      }))
  }

  async updateAttribute(id: number, dto: AttributeDto) {
    await this.getAttributeById(id)
    const attribute = await this.prismaService.attribute.update({
      where: { id },
      data: {
        title: dto.title,
      },
    })
    await this.prismaService.attributeOnCategories.deleteMany({
      where: { attributeId: id },
    })
    const _categories = await Promise.all(
      dto.categories.map(
        async (categoryId) =>
          await this.prismaService.attributeOnCategories.create({
            data: { categoryId, attributeId: id },
          }),
      ),
    )
    return {
      ...attribute,
      categories: await this.prismaService.category
        .findMany({
          where: {
            attributes: {
              some: {
                attributeId: id,
              },
            },
          },
        })
        .then((data) => data.map((c) => c.id)),
    }
  }

  async deleteAttribute(id: number) {
    await this.getAttributeById(id)
    await this.prismaService.attributeOnCategories.deleteMany({
      where: { attributeId: id },
    })
    await this.prismaService.attribute.delete({ where: { id } })
    return 'sucess'
  }
}
