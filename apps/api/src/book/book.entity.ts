import {
  ArrayType,
  Collection,
  Entity,
  EntityDTO,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Author } from 'src/author/author.entity';

@Entity()
export class Book {
  @PrimaryKey()
  id!: number;

  @Property()
  slug: string;

  @Property()
  title: string;

  @Property()
  description = '';

  @Property()
  body = '';

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ type: ArrayType })
  tagList: string[] = [];

  @ManyToOne(() => Author, { ref: true })
  author: Author;

  constructor(
    author: Author,
    title: string,
    description: string,
    body: string,
  ) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.body = body;
  }

  toJSON(author?: Author) {
    const o = wrap<Book>(this).toObject() as BookDTO;
    o.author = this.author.toJSON(author);

    return o;
  }
}

export interface BookDTO extends EntityDTO<Book> {
  favorited?: boolean;
}
