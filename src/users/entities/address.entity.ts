import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  street!: string;

  @Column()
  district!: string;

  @Column()
  city!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;
}
