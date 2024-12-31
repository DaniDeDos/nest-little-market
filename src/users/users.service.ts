import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto';

//import { CreateUserDto, LoginUserDto } from './dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
//import { JwtPayload } from './interface/interface-payload.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  //export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        // token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }
  /*
  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user)
      throw new UnauthorizedException(`Credentials are not valid (email)`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid (password)`);

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
*/
  handleErrors(error: any): never {
    //TODO: Validar username
    if (error.code === '23502' && error.column.includes('username'))
      throw new BadRequestException(`(username) is required`);

    //TODO: Validar email
    if (error.code === '23502' && error.column.includes('email'))
      throw new BadRequestException(`(email) is required`);

    //TODO: Validar password
    if (error.message.includes('data and salt arguments required'))
      throw new BadRequestException(`(password) is required`);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);
    this.logger.log(error);
    throw new InternalServerErrorException('Please check server logs!');
  }
}
