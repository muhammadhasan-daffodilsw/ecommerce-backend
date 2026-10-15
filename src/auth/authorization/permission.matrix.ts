import { Role, Permission } from './permissions.js';

export const PERMISSION_MATRIX: Record<Role, Permission[]> = {
  [Role.BUYER]: [Permission.LISTING_READ],

  [Role.SELLER]: [
    Permission.LISTING_CREATE,
    Permission.LISTING_READ,
    Permission.LISTING_UPDATE,
    Permission.LISTING_DELETE,
  ],

  [Role.ADMIN]: Object.values(Permission),
};
