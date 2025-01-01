import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role: string[] = this.reflector.get(META_ROLES, context.getHandler());

    if (!role) return true;
    if (role.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found!');

    const hasValidRole = role.some((reqRole) => user.role_id.includes(reqRole));

    if (!hasValidRole) {
      throw new ForbiddenException(
        `[${user.role_id.join(', ')}] inadequate privileges`,
      );
    }

    return true;
  }
}
