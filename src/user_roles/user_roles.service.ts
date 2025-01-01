import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserRolesService {
  private readonly logger = new Logger('UserRolesService');

  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    try {
      const newRole = createUserRoleDto;
      const newUserRole = this.userRoleRepository.create(newRole);

      await this.userRoleRepository.save(newUserRole);
      delete newUserRole.updatedAt;

      return newUserRole;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const roles = await this.userRoleRepository.find({
      take: limit,
      skip: offset,
      // relations: {
      //   img: true,
    });
    return roles;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }

  handleErrors(error: any): never {
    //TODO: Check (name) duplicate
    if (error.code === '23505' && error.detail.includes('already exists'))
      throw new BadRequestException(error.detail);

    //* console.log(error);
    this.logger.log(error);
    throw new InternalServerErrorException('Please check server logs!');
  }
}
