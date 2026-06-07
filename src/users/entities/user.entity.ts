import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.entity';
import { Role } from '../../enums/role.enum';

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

  @Column({ default: Role.CUSTOMER })
  role!: Role;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses!: Address[];
}
