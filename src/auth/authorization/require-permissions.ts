import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';

import { Permission, Role } from './permissions.js';
import { PERMISSION_MATRIX } from './permission.matrix.js';

export function RequirePermission(
  permission: Permission,
): Type<CanActivate> {
  @Injectable()
  class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) {
        throw new ForbiddenException('User not authenticated');
      }

      const role = user.role as Role;
      const permissions = PERMISSION_MATRIX[role];

      if (!permissions?.includes(permission)) {
        throw new ForbiddenException('Insufficient permissions');
      }

      return true;
    }
  }

  return PermissionGuard;
}