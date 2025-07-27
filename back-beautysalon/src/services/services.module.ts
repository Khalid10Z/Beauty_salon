import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Salon } from 'src/entities/salon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Salon])],
  controllers: [ServicesController],
  providers: [ServicesService],
})

export class ServicesModule {}
