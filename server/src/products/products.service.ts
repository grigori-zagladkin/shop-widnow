import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { FilesService } from 'src/files/files.service'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import ProductDto from './dto/product.dto'
import SearchProductDto, { EnumSortProduct } from './dto/search-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
    private readonly fileService: FilesService,
  ) {}

  async createProduct() {
    return await this.prismaService.product
      .create({
        data: {
          slug: '',
          title: '',
          description: '',
          images: [],
          count: 0,
          price: 0,
        },
      })
      .then((data) => data.id)
  }

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUniqueOrThrow({
      where: { id },
      include: {
        category: true,
        attributes: true,
      },
    })
    return product
  }

  async getSimilarProducts(slug: string) {
    const product = await this.getBySlug(slug)
    if (!product) {
      throw new NotFoundException('current product not found')
    }
    const products = await this.prismaService.product.findMany({
      where: {
        category: {
          id: product.categoryId,
        },
        NOT: {
          id: product.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        attributes: true,
      },
    })
    return products
  }

  async getLastProducts() {
    return await this.prismaService.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        attributes: true,
      },
    })
  }

  async getBySlug(slug: string) {
    return await this.prismaService.product.findUniqueOrThrow({
      where: { slug },
      include: {
        attributes: true,
        category: true,
      },
    })
  }

  async getByCategory(categoryId: number) {
    return await this.prismaService.product.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        count: 'desc',
      },
    })
  }

  async index(dto: SearchProductDto) {
    const {
      sort,
      searchTerm,
      minPrice = 0,
      maxPrice = 1000000,
      categoryId,
    } = dto
    const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []
    if (sort === EnumSortProduct.LOW_PRICE) {
      prismaSort.push({ price: 'asc' })
    } else if (sort === EnumSortProduct.HIGH_PRICE) {
      prismaSort.push({ price: 'desc' })
    } else if (sort === EnumSortProduct.OLDEST) {
      prismaSort.push({ createdAt: 'asc' })
    } else {
      prismaSort.push({ createdAt: 'desc' })
    }
    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              category: {
                title: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
          price: {
            lte: +maxPrice,
            gte: +minPrice,
          },
          categoryId: categoryId ? +categoryId : {},
        }
      : {}
    const { perPage, skip } = this.paginationService.getPagination(dto)
    const products = await this.prismaService.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip: Number(skip),
      take: Number(perPage),
      include: {
        category: true,
        attributes: true,
      },
    })
    return {
      products,
      length: await this.prismaService.product.count({
        where: prismaSearchTermFilter,
      }),
    }
  }

  async updateProduct(id: number, dto: ProductDto) {
    await this.getProductById(id)
    await this.prismaService.productAttributes.deleteMany({
      where: { productId: id },
    })
    const attrValues = await Promise.all(
      dto.attributes.map(
        async (attr) =>
          await this.prismaService.productAttributes.create({
            data: {
              attribute: attr.attribute,
              value: attr.value,
              productId: id,
            },
          }),
      ),
    )
    const category = await this.prismaService.category.findUnique({
      where: {
        id: +dto.categoryId,
      },
    })
    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        slug: generateSlug(dto.title),
        title: dto.title,
        description: dto.description,
        category: {
          connect: {
            id: +dto.categoryId,
          },
        },
        count: +dto.count,
        price: +dto.price,
        images: dto.images,
      },
    })
    return await this.getProductById(id)
  }

  async deleteProduct(id: number) {
    const product = await this.getProductById(id)
    await this.prismaService.productAttributes.deleteMany({
      where: { productId: id },
    })
    await Promise.all(
      product.images.map(async (image) => {
        const arr = image.split('/')
        await this.fileService.deleteFile(
          arr[arr.length - 1],
          arr[arr.length - 2],
        )
      }),
    )
    return await this.prismaService.product.delete({ where: { id } })
  }
}
