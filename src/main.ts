import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { initializeDynamoose } from './config/dynamoose-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  initializeDynamoose(configService);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
  });

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1m
      max: 10,
    })
  );

  await app.listen(3000);
}
bootstrap();
