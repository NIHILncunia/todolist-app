import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.set('etag', false);

  await app.listen(4000);

  const logger = new Logger('NestApplication', { timestamp: true, });
  logger.log('서버가 4000포트에서 실행되고 있습니다.');
}
bootstrap();
