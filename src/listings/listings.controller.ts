import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import {
  CreateListingDto,
  ListingResponseDto,
  SearchListingDto,
  UpdateListingDto,
} from './dto.js';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RequirePermission } from '../auth/authorization/require-permissions.js';
import { Permission } from '../auth/authorization/permissions.js';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { off } from 'process';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RequirePermission(Permission.LISTING_CREATE))
  @Post()
  @ApiOkResponse({ type: ListingResponseDto })
  create(@Request() req: any, @Body() createListingDto: CreateListingDto) {
    console.log(req.user);
    return this.listingsService.create(req.user.id, createListingDto);
  }

  @Get()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get('/search')
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'offset', type: Number, required: false })
  @ApiQuery({ name: 'q', type: String, required: false })
  @ApiQuery({name :'category_id',type:String,required:false})
  search(
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
    @Query('q') q: string | null = null,
    @Query('category_id') category_id : string | null = null
  ) {
    let data = new SearchListingDto({ q: q, offset: offset, limit: limit ,category_id : category_id});
    console.log(data);
    return this.listingsService.search(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RequirePermission(Permission.LISTING_UPDATE))
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    console.log(updateListingDto);
    return this.listingsService.update(id, updateListingDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RequirePermission(Permission.LISTING_DELETE))
  @ApiAcceptedResponse()
  @Delete(':id')
  async remove(@Request() req :any, @Param('id') id: string) {
    return await this.listingsService.remove(req.user.id, id);
  }
}
