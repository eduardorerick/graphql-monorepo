import { EntityRepository } from '@mikro-orm/core';
import { Author } from './author.entity';

export class AuthorRepository extends EntityRepository<Author> {}
