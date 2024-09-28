import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthorRepository } from './author.repository';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { IAuthorData, IAuthorRO } from './author.interface';
import { UpdateAuthorDto } from './dto';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Author[]> {
    const data = await this.authorRepository.findAll();
    console.log({ data });
    return data || [];
  }

  async findOneById(id: number): Promise<Author | null> {
    return this.authorRepository.findOne({ id });
  }

  async create(dto: CreateAuthorDto): Promise<IAuthorRO> {
    const { username, email } = dto;
    const exists = await this.authorRepository.count({
      $or: [{ email }],
    });

    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Email must be unique.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new Author(username, email);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Userinput is not valid.' },
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.em.persistAndFlush(user);
      return this.buildAuthorRO(user);
    }
  }

  async update(id: number, dto: UpdateAuthorDto) {
    const user = await this.authorRepository.findOneOrFail(id);
    wrap(user).assign(dto);
    await this.em.flush();

    return this.buildAuthorRO(user);
  }

  async delete(id: number) {
    return this.authorRepository.nativeDelete({ id });
  }

  async findById(id: number): Promise<IAuthorRO> {
    const user = await this.authorRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildAuthorRO(user);
  }

  async findByEmail(email: string): Promise<IAuthorRO> {
    const user = await this.authorRepository.findOneOrFail({ email });
    return this.buildAuthorRO(user);
  }

  private buildAuthorRO(user: Author): IAuthorRO {
    const userRO = {
      id: user.id,
      bio: user.bio,
      email: user.email,
      username: user.username,
    } as IAuthorData;

    return { user: userRO };
  }
}
