import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Role } from '../../common/enums/role.enum';
import { Order } from '../../orders/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  phoneNumber!: string;

  @Column({ nullable: true })
  avatarKey?: string;

  @Column({ default: Role.CUSTOMER })
  role!: Role;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses?: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];
}
