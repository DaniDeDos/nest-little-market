import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto';

@Controller('accounts')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup/user')
  signUp(@Body() createUserDto: RegisterUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('signin/user')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
}
