// src/entities/service.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Salon } from './salon.entity';
import { Booking } from './booking.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  duration: number; // en minutes

  @ManyToOne(() => Salon, (salon) => salon.services, { onDelete: 'CASCADE' })
  salon: Salon;

  @OneToMany(() => Booking, (booking) => booking.service)
  bookings: Booking[];
}
