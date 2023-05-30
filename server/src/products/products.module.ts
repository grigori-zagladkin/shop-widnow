import { Module } from '@nestjs/common'
import { FilesService } from 'src/files/files.service'
import { PaginationModule } from 'src/pagination/pagination.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, FilesService],
  imports: [PaginationModule],
})
export class ProductsModule {}
