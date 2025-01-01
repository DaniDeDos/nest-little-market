import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

//! fullname
export class RegisterUserDto {
  @IsString()
  @MinLength(30)
  fullname: string;

  //! username
  @IsString()
  @MinLength(3)
  username?: string;

  //! password
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  //! email
  @IsEmail()
  email: string;
}
