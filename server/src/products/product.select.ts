import { Prisma } from '@prisma/client'

export const productReturnObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  title: true,
  price: true,
  createdAt: true,
  slug: true,
  attributes: true,
}

export const productReturnObjectFullest: Prisma.ProductSelect = {
  ...productReturnObject,
}
