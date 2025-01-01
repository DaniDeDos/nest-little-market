import { IsString, MinLength } from 'class-validator';

export class CreateUserRoleDto {
  //! name
  @IsString()
  @MinLength(3)
  name: string;
}
