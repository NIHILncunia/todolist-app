import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todos/todo.module';
import { LoggerMiddleware } from '@/middlewares/logger.middleware';

@Module({
  imports: [ AuthModule, PrismaModule, UsersModule, TodoModule, ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
