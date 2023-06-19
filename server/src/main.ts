import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'
import { urlencoded, json } from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false })

  const configService = app.get(ConfigService)

  const frontendUrl = configService.get('FRONTEND_URL')
  app.enableCors({
    credentials: true,
    origin: true,
  })
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  app.use(json({ limit: '50mb' }))
  app.use(urlencoded({ extended: true, limit: '50mb' }))

  const PORT = configService.get('PORT') || 1999

  const config = new DocumentBuilder()
    .setTitle('bu-okno-yar api')
    .setDescription('api description')
    .setVersion('v1.0')
    .addTag('endpoints')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  await app.listen(PORT, () => console.log(`server - ${PORT}`))
}
bootstrap()
