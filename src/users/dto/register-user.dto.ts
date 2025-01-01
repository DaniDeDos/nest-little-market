import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  //! username
  username?: string;

  @IsString()
  @MinLength(30)
  //! fullname
  fullname: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  //! password
  password: string;

  @IsEmail()
  //! email
  email?: string;
}
