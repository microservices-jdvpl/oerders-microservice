import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main orders-MS');
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.PORT);
  logger.log(`Ms is running on ${await app.getUrl()}`);
}
bootstrap();
