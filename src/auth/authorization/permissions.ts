export enum Role {
  BUYER = 'buyer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

export enum Permission {
  LISTING_CREATE = 'listing:create',
  LISTING_READ = 'listing:read',
  LISTING_UPDATE = 'listing:update',
  LISTING_DELETE = 'listing:delete',

  CATEGORY_CREATE = 'category:create',
  CATEGORY_UPDATE = 'category:update',
  CATEGORY_DELETE = 'category:delete',

  USER_READ = 'user:read',
  USER_DELETE = 'user:delete',
}
