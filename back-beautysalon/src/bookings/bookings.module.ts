import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';
import { Salon } from '../entities/salon.entity';
import { Service } from '../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Salon, Service])],
  providers: [BookingsService],
  controllers: [BookingsController],
})
export class BookingsModule {}
