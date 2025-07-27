// src/salons/salons.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalonsService } from './salons.service';
import { SalonsController } from './salons.controller';
import { Salon } from '../entities/salon.entity'; // ✅ à adapter selon ton chemin

@Module({
  imports: [TypeOrmModule.forFeature([Salon])], // ✅ OBLIGATOIRE
  controllers: [SalonsController],
  providers: [SalonsService],
})
export class SalonsModule {}
