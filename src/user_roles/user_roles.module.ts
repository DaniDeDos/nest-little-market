import { Module } from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import { UserRolesController } from './user_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserRole } from './entities/user_role.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserRole]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserRolesController],
  providers: [UserRolesService],
  exports: [],
})
export class UserRolesModule {}
