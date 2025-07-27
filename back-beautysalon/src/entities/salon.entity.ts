import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from './service.entity';
import { Booking } from './booking.entity';

@Entity()
export class Salon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Service, (service) => service.salon)
  services: Service[];

  @OneToMany(() => Booking, (booking) => booking.salon)
  bookings: Booking[];
}
