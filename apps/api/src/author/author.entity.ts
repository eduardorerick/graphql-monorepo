import { IsEmail } from 'class-validator';
import {
  Collection,
  Entity,
  EntityDTO,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  Opt,
  PrimaryKey,
  Property,
  wrap,
} from '@mikro-orm/core';
import { Book } from '../book/book.entity';
import { AuthorRepository } from './author.repository';

@Entity({ repository: () => AuthorRepository })
export class Author {
  [EntityRepositoryType]?: AuthorRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  username: string;

  @Property({ hidden: true })
  @IsEmail()
  email: string;

  @Property()
  bio: string & Opt = '';

  @OneToMany(() => Book, (article) => article.author, { hidden: true })
  books = new Collection<Book>(this);

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  toJSON(user?: Author) {
    const o = wrap<Author>(this).toObject() as UserDTO;

    return o;
  }
}

interface UserDTO extends EntityDTO<Author> {}
