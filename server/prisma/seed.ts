import { Prisma, PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

let items = (min: number, max: number) => {
  let arr = []
  for (let i = min; i < max; i++) {
    let doc: Prisma.ProductCreateInput = {
      title: `Окно ${i}`,
      slug: `okno-${i}`,
      description:
        'prisma db seed allows you to define custom arguments in your seed file that you can pass to the prisma db seed command. For example, you could define your own arguments to seed different data for different environments or partially seeding data in some tables.',
      images: [
        '/uploads/products/pvhokno.jpg',
        '/uploads/products/pvh-dver.jpg',
        '/uploads/products/pvhokno.jpg',
        '/uploads/products/pvhokno.jpg',
      ],
      price: 1000 + i,
      count: i,
    }
    arr.push(doc)
  }
  return arr
}

async function main() {
  const category1 = await prisma.category.upsert({
    where: { id: 100000 },
    update: {},
    create: {
      title: 'Радиатори и отопление',
      description: 'Check out Prisma with Next.js',
      image: '/uploads/categories/pvhokno.jpg',
      slug: 'slug',
      products: {
        createMany: {
          data: items(100, 150),
        },
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
