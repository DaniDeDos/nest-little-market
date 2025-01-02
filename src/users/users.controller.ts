import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/interfaces';

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

  @Get('user')
  @Auth(Role.root)
  finAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }
}
