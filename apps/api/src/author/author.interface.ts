export interface IAuthorData {
  id: number
  bio: string;
  email: string;
  username: string;
}

export interface IAuthorRO {
  user: IAuthorData;
}
