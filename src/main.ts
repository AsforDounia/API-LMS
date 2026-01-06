import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Bootstrap');
  const PORT = process.env.PORT ?? 3000;

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(PORT, () => {
    logger.log(`Server is listening at port ${PORT}`);
    logger.log(`Current environment is: ${process.env.NODE_ENV}`);
  });
}
bootstrap();
