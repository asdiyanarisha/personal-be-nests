import { Module } from '@nestjs/common';
import { BlogUseCase } from './blog.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog, Tag } from '../../entities';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { BuildResponseUtil } from '../../util';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Blog, Tag]),
  ],
  providers: [BlogUseCase, BuildResponseUtil],
  exports: [BlogUseCase],
})
export class BlogUseCasesModule {}
