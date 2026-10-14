import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ConfigModule } from '@nestjs/config';
import { PhoneUtilModule } from './common/phone-util/phone-util.module.js';
import { ListingsModule } from './listings/listings.module.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    PhoneUtilModule,
    ListingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
