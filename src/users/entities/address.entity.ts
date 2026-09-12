import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column()
  @IsNotEmpty()
  street!: string;

  @Column()
  @IsNotEmpty()
  ward!: string;

  @Column()
  @IsNotEmpty()
  city!: string;

  @Column({ default: false })
  isDefault!: boolean;

  @ManyToOne(() => User, (user) => user.addresses)
  user?: User;
}
