import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { Salon } from '../entities/salon.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,
    @InjectRepository(Salon)
    private readonly salonRepo: Repository<Salon>,
  ) {}

  async create(data: { name: string; price: number; duration: number; salonId: number }) {
    const salon = await this.salonRepo.findOne({ where: { id: data.salonId } });
    if (!salon) throw new NotFoundException('Salon introuvable');

    const service = this.serviceRepo.create({
      name: data.name,
      price: data.price,
      duration: data.duration,
      salon,
    });
    return this.serviceRepo.save(service);
  }

  findAll() {
    return this.serviceRepo.find({ relations: ['salon'] });
  }

  findBySalon(salonId: number) {
    return this.serviceRepo.find({
      where: { salon: { id: salonId } },
      relations: ['salon'],
    });
  }

  update(id: number, data: Partial<Service>) {
    return this.serviceRepo.update(id, data);
  }

  remove(id: number) {
    return this.serviceRepo.delete(id);
  }
}
