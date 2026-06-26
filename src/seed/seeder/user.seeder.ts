import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../../users/entities/user.entity';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    const users = [
      {
        email: 'admin@neswear.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'System',
        lastName: 'Admin',
        phoneNumber: '0900000001',
        role: Role.ADMIN,
        avatarKey: 'avatars/admin.png',

        addresses: [
          {
            street: '1 Nguyen Hue',
            ward: 'Ben Nghe Ward',
            district: 'District 1',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'manager@neswear.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Store',
        lastName: 'Manager',
        phoneNumber: '0900000002',
        role: Role.ADMIN,
        avatarKey: 'avatars/admin.png',

        addresses: [
          {
            street: '123 Le Loi',
            ward: 'Ben Thanh Ward',
            district: 'District 1',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'nguyenvana@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Van',
        lastName: 'Nguyen',
        phoneNumber: '0901111111',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '123 Tran Hung Dao',
            ward: 'Ward 5',
            district: 'District 5',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'tranthib@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Thi',
        lastName: 'Tran',
        phoneNumber: '0902222222',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '45 Cach Mang Thang 8',
            ward: 'Hoa Hung Ward',
            district: 'District 10',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'levanc@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Van',
        lastName: 'Le',
        phoneNumber: '0903333333',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '8 Pham Van Dong',
            ward: 'Hiep Binh Chanh',
            district: 'Thu Duc',
            city: 'Ho Chi Minh City',
          },
          {
            street: '12 Le Van Viet',
            ward: 'Tang Nhon Phu B',
            district: 'Thu Duc',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'phamthid@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Thi',
        lastName: 'Pham',
        phoneNumber: '0904444444',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '88 Le Van Khuong',
            ward: 'Tan Thoi Hiep',
            district: 'District 12',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'hoange@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Anh',
        lastName: 'Hoang',
        phoneNumber: '0905555555',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '50 Le Thi Rieng',
            ward: 'Thoi An',
            district: 'District 12',
            city: 'Ho Chi Minh City',
          },
        ],
      },

      {
        email: 'vubao@gmail.com',
        password: await bcrypt.hash('ab123456@', 10),
        firstName: 'Bao',
        lastName: 'Vu',
        phoneNumber: '0906666666',
        role: Role.CUSTOMER,
        avatarKey: 'avatars/default.png',

        addresses: [
          {
            street: '21 Dien Bien Phu',
            ward: 'P15',
            district: 'Binh Thanh',
            city: 'Ho Chi Minh City',
          },
        ],
      },
    ];

    const entities = this.userRepository.create(users);

    await this.userRepository.save(entities);

    console.log(`Seeded ${users.length} users`);
  }
}
