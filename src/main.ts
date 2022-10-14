import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppDataSource } from './config/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

// AppDataSource.initialize().then(async () => {
  
// })