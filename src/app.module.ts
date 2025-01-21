import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegisterController } from './controllers';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController, RegisterController],
  providers: [AppService],
})
export class AppModule {}
