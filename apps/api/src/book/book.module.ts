import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  // imports: [MikroOrmModule.forFeature()],
  imports: [OrmModule],
  controllers: [],
  providers: [],
})
export class BookModule {}
