import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfig } from './configurations/server.config';
import { VersioningType } from '@nestjs/common';
import { Environment } from './configurations';
import { AppConfig } from './configurations/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4200',
      'http://localhost:64360',
    ], // Add your frontend URLs here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  // Get config
  const configService = app.get(ConfigService);
  const { port, nodeEnv } = configService.getOrThrow<ServerConfig>('config');

  if (nodeEnv == Environment.Development) {
    const swaggerConfig =
      configService.getOrThrow<AppConfig['swagger']>('swagger');
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  await app.listen(port);
}
bootstrap();
