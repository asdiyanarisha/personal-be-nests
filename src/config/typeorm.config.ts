import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User, Blog } from '../entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('database.host'),
    port: config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    database: config.get('database.name'),
    entities: [User, Blog],
    synchronize: false,
    logging: true,
    autoLoadEntities: true,
  }),
  inject: [ConfigService],
};

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PWD,
  database: process.env.POSTGRES_DB,
  entities: ['./src/**/entities/*.entity.ts'],
  migrations: ['./src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  })