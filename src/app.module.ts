import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegisterController } from './controllers';
import { AppService } from './app.service';
import { UserUseCasesModule } from './usecase/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserUseCasesModule,
  ],
  controllers: [AppController, RegisterController, AuthController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
