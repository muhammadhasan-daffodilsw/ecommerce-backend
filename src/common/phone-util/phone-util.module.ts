import { Global, Module } from '@nestjs/common';
import { PhoneUtilsService } from './phone-util.service.js';

@Global()
@Module({
  providers: [PhoneUtilsService],
  exports: [PhoneUtilsService],
})
export class PhoneUtilModule {}
