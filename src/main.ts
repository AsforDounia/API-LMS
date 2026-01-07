import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,        // strips unknown properties
    forbidNonWhitelisted: true,  // throws error for unknown properties
    transform: true,        // auto-transform payloads to DTO instances
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  console.log('Mongo URI:', process.env.MONGODB_URI);
}
bootstrap();
