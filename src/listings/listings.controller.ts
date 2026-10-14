import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { CreateListingDto,UpdateListingDto } from './dto.js';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RequirePermission } from '../auth/authorization/require-permissions.js';
import { Permission } from '../auth/authorization/permissions.js';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RequirePermission(Permission.LISTING_CREATE))
  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    console.log('in');
    return this.listingsService.create(createListingDto);
  }
  
  @Get()
  findAll() {
    return this.listingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RequirePermission(Permission.LISTING_UPDATE))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard,RequirePermission(Permission.LISTING_DELETE))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
