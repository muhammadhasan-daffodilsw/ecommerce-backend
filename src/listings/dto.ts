import { PartialType } from '@nestjs/swagger';


export class CreateListingDto {}
export class UpdateListingDto extends PartialType(CreateListingDto) {}