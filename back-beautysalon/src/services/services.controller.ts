import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() body: { name: string; price: number; duration: number; salonId: number }) {
    return this.servicesService.create(body);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('/salon/:salonId')
  findBySalon(@Param('salonId') salonId: string) {
    return this.servicesService.findBySalon(+salonId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<any>) {
    return this.servicesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
