import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql'; // Import EntityManager from your driver package or `@mikro-orm/knex`
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
  
}
