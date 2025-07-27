import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Salon } from './salon.entity';
import { Service } from './service.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  datetime: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Salon, (salon) => salon.bookings)
  salon: Salon;

  @ManyToOne(() => Service, (service) => service.bookings)
  service: Service;
}
