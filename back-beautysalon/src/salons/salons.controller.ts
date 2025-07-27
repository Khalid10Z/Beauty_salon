// src/salons/salons.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalonsService } from './salons.service';

@Controller('salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @Get()
  findAll() {
    return this.salonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salonsService.findOne(+id);
  }

  @Post()
  create(@Body() body: { name: string; address: string }) {
    return this.salonsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name?: string; address?: string }) {
    return this.salonsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salonsService.remove(+id);
  }
}
