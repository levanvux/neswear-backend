import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Neswear Backend')
    .setDescription("API for a men's fashion e-commerce platform")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}
bootstrap().catch((err) => console.error(err));
