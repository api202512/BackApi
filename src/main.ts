import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyMiddleware } from './common/parse-mongo-id/middleware/api-key.middleware';
import { ApiUsoService } from './apiuso/services/api-uso.service';
import { ApiKeyService } from './api-key/services/api-key.service';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Programa Educativo de Tecnologías de la Información')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addBearerAuth() // Para permitir autenticación con token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const apiKeyService = app.get(ApiKeyService);
  const apiUsoService = app.get(ApiUsoService);
  app.use(
    '/public-api',
    new ApiKeyMiddleware(apiKeyService, apiUsoService).use,
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
