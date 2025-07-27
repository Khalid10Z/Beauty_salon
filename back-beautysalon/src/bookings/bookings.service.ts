import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Salon } from '../entities/salon.entity';
import { Service } from '../entities/service.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Salon) private salonRepo: Repository<Salon>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
  ) {}

  async create(
    userId: number,
    data: { salonId: number; serviceId: number; datetime: Date },
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const salon = await this.salonRepo.findOne({ where: { id: data.salonId } });
    const service = await this.serviceRepo.findOne({
      where: { id: data.serviceId },
    });

    if (!user || !salon || !service) {
      throw new NotFoundException('Utilisateur, salon ou service introuvable');
    }

    const booking = this.bookingRepo.create({
      datetime: data.datetime,
      user,
      salon,
      service,
    });

    return this.bookingRepo.save(booking);
  }

  findByUser(userId: number) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['salon', 'service'],
      order: { datetime: 'ASC' },
    });
  }

  findBySalon(salonId: number) {
    return this.bookingRepo.find({
      where: { salon: { id: salonId } },
      relations: ['user', 'service'],
      order: { datetime: 'ASC' },
    });
  }

  remove(id: number) {
    return this.bookingRepo.delete(id);
  }
}
