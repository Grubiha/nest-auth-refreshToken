import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Шаблон аутентификации/авторизации')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('AUTH')
    .addTag('USERS')
    .addTag('ROLES')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)
  
  

  await app.listen(PORT, ()=> console.log(`Приложение запустилось на ${PORT} порту`));
}
bootstrap();
