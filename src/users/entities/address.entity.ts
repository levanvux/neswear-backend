import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  street!: string;

  @Column()
  @IsNotEmpty()
  ward!: string;

  @Column()
  @IsNotEmpty()
  district!: string;

  @Column()
  @IsNotEmpty()
  city!: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;
}
