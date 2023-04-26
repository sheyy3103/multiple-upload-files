import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  app.useStaticAssets('./src/public');
  await app.listen(8080);
}
bootstrap();
