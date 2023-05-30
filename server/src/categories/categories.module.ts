import { Module } from '@nestjs/common'
import { FilesModule } from 'src/files/files.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
  imports: [FilesModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
