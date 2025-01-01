import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Headers,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from 'src/auth/decorators/raw-headers.decorator';

import { IncomingHttpHeaders } from 'http';
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

  @Get('private')
  @Auth(Role.admin)
  testPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    // @RawHeaders() rawHeaders: string,
    // @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      msg: 'test hellow',
      user,
      userEmail,
    };
  }
}
