import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppDataSource } from './config/database';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({disableErrorMessages: true}));
    await app.listen(3000);
}
bootstrap();

// AppDataSource.initialize().then(async () => {

// })
