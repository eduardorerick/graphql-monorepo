import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { DataloaderType, defineConfig } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');
export default defineConfig({
  // driver: PostgreSqlDriver,
  host: 'localhost',
  port: 5432,
  user: 'dev',
  password: 'dev',

  dbName: 'graphql-test',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  dataloader: DataloaderType.ALL,
});
