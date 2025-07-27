// src/salons/salons.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Salon } from '../entities/salon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalonsService {
  constructor(
    @InjectRepository(Salon)
    private salonRepo: Repository<Salon>,
  ) {}

  create(data: Partial<Salon>) {
    const salon = this.salonRepo.create(data);
    return this.salonRepo.save(salon);
  }

  findAll() {
    return this.salonRepo.find();
  }

  findOne(id: number) {
    return this.salonRepo.findOne({ where: { id } });
  }

  update(id: number, data: Partial<Salon>) {
    return this.salonRepo.update(id, data);
  }

  remove(id: number) {
    return this.salonRepo.delete(id);
  }
}
