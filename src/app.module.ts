import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RegisterController } from './controllers';
import { AppService } from './app.service';
import { UserUseCasesModule } from './usecase/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    UserUseCasesModule,
  ],
  controllers: [AppController, RegisterController],
  providers: [AppService],
})
export class AppModule {}
