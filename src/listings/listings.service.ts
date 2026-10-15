import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateListingDto, SearchListingDto, UpdateListingDto } from './dto.js';
import { ListingRepository } from './listings.repo.js';
import { InfoDto } from '../auth/dto.js';

@Injectable()
export class ListingsService {
  constructor(private readonly listingRepo: ListingRepository) {}

  async create(seller_id: string, createListingDto: CreateListingDto) {
    return await this.listingRepo.createListing(seller_id, createListingDto);
  }

  findAll() {
    return `This action returns all listings`;
  }

  findOne(id: string) {
    return `This action returns a #${id} listing`;
  }

  async update(
    id: string,
    updateListingDto: UpdateListingDto,
    user_id: string,
  ) {
    const listing = await this.listingRepo.getListingById(id);
    if (!listing || listing.seller_id != user_id) {
      throw new NotFoundException('Lisiting Not Found');
    }

    return await this.listingRepo.updateListingById(id, updateListingDto);
  }
  
  async remove(user_id : string, id: string) : Promise<InfoDto>{
    const listing = await this.listingRepo.getListingById(id);

    if (!listing) throw new NotFoundException('Listing Not Found')
    
    if (listing.seller_id != user_id) throw new UnauthorizedException('Listing Not Owned');
    
    await this.listingRepo.deleteListingById(id);
    return {message : 'Listing Delete Success.'};
  }

  async search( data : SearchListingDto)
  {
    return await this.listingRepo.searchListings(data);
  }


}
