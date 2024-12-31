import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);

  console.log(await app.getUrl());
  logger.log(
    `Server running on http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
main();
//is running on: ${await app.getUrl()}`
