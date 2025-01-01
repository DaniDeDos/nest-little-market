import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './entities/user_role.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';

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
    });
    return roles;
  }

  async findOne(term: string) {
    let role: UserRole;
    let termUuid = false;

    if (isUUID(term)) {
      termUuid = true;
      role = await this.userRoleRepository.findOneBy({ id: term });
    } else {
      role = await this.userRoleRepository.findOneBy({ name: term });
    }

    if (!role && termUuid)
      throw new NotFoundException(`Role with id [${term}] not found!`);
    if (!role && !termUuid)
      throw new NotFoundException(`Role with name ${term} not found!`);

    return role;
  }

  async update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    const role = await this.findOne(id);
    try {
      role.name = updateUserRoleDto.name;
      await this.userRoleRepository.save(role);
      return {
        ...role,
        ...updateUserRoleDto,
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    await this.userRoleRepository.remove(role);
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
