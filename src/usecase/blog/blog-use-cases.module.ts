import { Module } from '@nestjs/common';
import { BlogUseCase } from './blog.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from '../../entities';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Blog]),
  ],
  providers: [BlogUseCase],
  exports: [BlogUseCase],
})
export class BlogUseCasesModule {}
