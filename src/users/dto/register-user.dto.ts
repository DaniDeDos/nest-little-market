import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterUserDto {
  //! fullname
  @IsString()
  @Length(20, 40)
  fullname: string;

  //! username
  @IsString()
  @Length(3, 18)
  username?: string;

  //! password
  @IsString()
  @Length(8, 48)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  //! email
  @IsEmail()
  email: string;
}
