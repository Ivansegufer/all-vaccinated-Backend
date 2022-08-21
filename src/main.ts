import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import GlobalPipesArray from './global-pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(...GlobalPipesArray);

  await app.listen(80);
}
bootstrap();
