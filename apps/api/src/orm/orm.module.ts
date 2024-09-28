import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Author } from 'src/author/author.entity';
import { Book } from 'src/book/book.entity';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    MikroOrmModule.forFeature({
      entities: [Author, Book],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
