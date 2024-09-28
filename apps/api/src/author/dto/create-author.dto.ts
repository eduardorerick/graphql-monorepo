import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  readonly username!: string;

  @IsNotEmpty()
  readonly email!: string;
}
