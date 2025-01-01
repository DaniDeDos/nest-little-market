import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { Role } from 'src/auth/interfaces';

export function Auth(...role: Role[]) {
  return applyDecorators(
    RoleProtected(...role),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
