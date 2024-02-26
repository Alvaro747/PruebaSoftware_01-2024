import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './filters/prisma-global-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from '@filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // CORS configuration
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
