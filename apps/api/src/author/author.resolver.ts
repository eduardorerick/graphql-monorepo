import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { PubSub } from 'graphql-subscriptions';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { Author } from './author.entity';
import { IAuthorData, IAuthorRO } from './author.interface';
import { Book } from 'src/book/book.entity';

const pubSub = new PubSub();

@Resolver('Author')
export class AuthorResolvers {
  constructor(private readonly authorService: AuthorService) {}

  @Query('authors')
  async authors(): Promise<Author[]> {
    console.log('teste');
    return this.authorService.findAll();
  }

  @Query('author')
  async author(@Args('id') args: number): Promise<Author> {
    return this.authorService.findOneById(args);
  }

  @Mutation('createAuthor')
  async create(@Args('input') args: CreateAuthorDto): Promise<IAuthorData> {
    const createdAuthor = await this.authorService.create(args);
    console.log({ createdAuthor: createdAuthor.user });
    pubSub.publish('authorCreated', { authorCreated: createdAuthor.user });
    return createdAuthor.user;
  }

  @Mutation('updateAuthor')
  async update(
    @Args('input') args: UpdateAuthorDto & { id: number },
  ): Promise<IAuthorRO> {
    let dto = { ...args };
    delete dto.id;
    return this.authorService.update(args.id, dto);
  }

  @Mutation('deleteAuthor')
  async delete(@Args('id') args: number): Promise<number> {
    return this.authorService.delete(args);
  }

  @Subscription('authorCreated')
  authorCreated() {
    return pubSub.asyncIterator('authorCreated');
  }
}
