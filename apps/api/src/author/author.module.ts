import { Module } from '@nestjs/common';

import { AuthorService } from './author.service';
import { AuthorResolvers } from './author.resolver';
import { OrmModule } from 'src/orm/orm.module';

@Module({
  exports: [AuthorService],
  imports: [OrmModule],
  providers: [AuthorService, AuthorResolvers],
})
export class AuthorModule {}
