import { Injectable } from '@nestjs/common';
import { CreateListingDto ,UpdateListingDto} from './dto.js';

@Injectable()
export class ListingsService {
  create(createListingDto: CreateListingDto) {
    return 'This action adds a new listing';
  }

  findAll() {
    return `This action returns all listings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
