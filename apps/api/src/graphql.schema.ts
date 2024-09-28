
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewAuthor {
    username: string;
    email: string;
}

export class UpdateAuthor {
    id: string;
    bio?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
}

export class Author {
    id: string;
    bio?: Nullable<string>;
    email?: Nullable<string>;
    username?: Nullable<string>;
}

export abstract class IQuery {
    abstract authors(): Author[] | Promise<Author[]>;

    abstract author(id: string): Nullable<Author> | Promise<Nullable<Author>>;
}

export abstract class IMutation {
    abstract createAuthor(input: NewAuthor): Author | Promise<Author>;

    abstract updateAuthor(input: UpdateAuthor): Nullable<Author> | Promise<Nullable<Author>>;

    abstract deleteAuthor(id: string): Nullable<Author> | Promise<Nullable<Author>>;
}

export abstract class ISubscription {
    abstract authorCreated(): Nullable<Author> | Promise<Nullable<Author>>;
}

type Nullable<T> = T | null;
