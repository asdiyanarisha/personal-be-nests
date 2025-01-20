import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegisterController } from './controllers';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({

    }),
  ],
  controllers: [AppController, RegisterController],
  providers: [AppService],
})
export class AppModule {}
