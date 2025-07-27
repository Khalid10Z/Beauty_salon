import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() body: { userId: number; salonId: number; serviceId: number; datetime: Date }) {
    return this.bookingsService.create(body.userId, body);
  }

  @Get('/user/:id')
  getBookingsByUser(@Param('id') id: string) {
    return this.bookingsService.findByUser(+id);
  }

  @Get('/salon/:id')
  getBookingsBySalon(@Param('id') id: string) {
    return this.bookingsService.findBySalon(+id);
  }

  @Delete(':id')
  cancel(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }
}
