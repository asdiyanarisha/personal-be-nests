import { Module } from '@nestjs/common';
import { UserFactoryService } from './user-factory.service';
import { UserUseCase } from './user.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsync } from '../../config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtModuleAsync),
  ],
  providers: [UserFactoryService, UserUseCase],
  exports: [UserUseCase],
})
export class UserUseCasesModule {}
