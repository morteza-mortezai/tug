import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggerService } from './common/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionsFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('TUG Test')
    .setDescription('Test api')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  
  const logger = app.get<LoggerService>(LoggerService);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new GlobalExceptionsFilter(logger));
  const port = configService.get<number>('APP_PORT') ?? 3000;

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);
}
bootstrap();
