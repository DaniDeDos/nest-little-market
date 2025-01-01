import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  //! Register
  async register(createUserDto: RegisterUserDto) {
    try {
      const { password, ...newUserData } = createUserDto;

      const user = this.userRepository.create({
        ...newUserData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  //! Login
  async login(loginUserDto: LoginUserDto) {
    const { username, password, email } = loginUserDto;

    //TODO: Validar username || email
    if (!username && !email)
      throw new NotFoundException(`either (username) or (email) is required`);

    if (username && email)
      throw new NotFoundException(
        `only one of (username) or (email) is allowed`,
      );

    const user = await this.userRepository.findOne({
      where: username ? { username } : { email },
      select: {
        id: true,
        username: true,
        fullname: true,
        email: true,
      },
    });

    //TODO: if bad username || email
    if (!user) throw new UnauthorizedException(`Credentials are not valid`);

    //TODO: if bad password
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid`);

    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  handleErrors(error: any): never {
    //* console.log(error);
    //TODO: Validar username
    if (error.code === '23502' && error.column.includes('username'))
      throw new BadRequestException(`(username) is required`);

    //TODO: Validar fullname
    if (error.code === '23502' && error.column.includes('fullname'))
      throw new BadRequestException(`(fullname) is required`);

    //TODO: Validar email
    if (error.code === '23502' && error.column.includes('email'))
      throw new BadRequestException(`(email) is required`);

    //TODO: Validar password
    if (error.message.includes('data and salt arguments required'))
      throw new BadRequestException(`(password) is required`);

    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.log(error);
    throw new InternalServerErrorException('Please check server logs!');
  }
}
