/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
    const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for My NestJS App')
    .setVersion('1.0')
    .addBearerAuth() // If using authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
