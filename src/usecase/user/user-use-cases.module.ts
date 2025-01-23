import { Module } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { UserUseCase } from './user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserFactoryService, UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCasesModule {}
