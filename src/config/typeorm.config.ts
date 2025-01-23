import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'userPersonal',
  password: 'userPersonal123',
  database: 'personalPages',
  entities: [User],
  synchronize: false,
  logging: true,
};

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'userPersonal',
  password: 'userPersonal123',
  database: 'personalPages',
  entities: ['./src/**/entities/*.entity.ts'],
  migrations: ['./src/database/migrations/*-migration.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
