import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

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
  avatarUrl?: string;

  @Column({ default: 'customer' })
  role!: string;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses!: Address[];
}
