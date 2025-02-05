import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserUseCasesModule } from './usecase/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import {
  AuthController,
  UserController,
  RegisterController,
  BlogController,
} from './controllers';
import { BuildResponseUtil } from './util';
import { AuthMiddleware } from './middleware/auth.middleware';
import { BlogUseCasesModule } from './usecase/blog';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserUseCasesModule,
    BlogUseCasesModule,
  ],
  controllers: [
    AppController,
    RegisterController,
    BlogController,
    AuthController,
    UserController,
  ],
  providers: [AppService, BuildResponseUtil],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BlogController);
  }
}
