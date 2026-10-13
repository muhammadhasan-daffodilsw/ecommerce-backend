// src/common/services/phone-utils.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Injectable()
export class PhoneUtilsService {
  normalizeIndianNumber(phone: string): string {
    if (!phone) {
      throw new BadRequestException('Phone number is required');
    }

    const phoneNumber = parsePhoneNumberFromString(phone, 'IN');

    if (
      !phoneNumber ||
      !phoneNumber.isValid() ||
      phoneNumber.country !== 'IN'
    ) {
      throw new BadRequestException('Invalid Indian phone number provided');
    }

    return phoneNumber.format('E.164'); // Returns "+91XXXXXXXXXX"
  }
}
