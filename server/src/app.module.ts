import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { join } from 'path'
import { AttributesModule } from './attributes/attributes.module'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { FilesModule } from './files/files.module'
import { PaginationModule } from './pagination/pagination.module'
import { PrismaService } from './prisma/prisma.service'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(path, 'uploads'),
    }),
    FilesModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    AttributesModule,
    PaginationModule,
    BannerModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
