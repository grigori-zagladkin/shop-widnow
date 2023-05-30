import { Module } from '@nestjs/common'
import { CategoriesService } from 'src/categories/categories.service'
import { FilesService } from 'src/files/files.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AttributesController } from './attributes.controller'
import { AttributesService } from './attributes.service'

@Module({
  controllers: [AttributesController],
  providers: [
    PrismaService,
    CategoriesService,
    FilesService,
    AttributesService,
  ],
  imports: [],
})
export class AttributesModule {}
